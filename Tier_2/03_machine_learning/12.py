# 1. Download the Concrete dataset

import matplotlib.pyplot as plt
import pandas as pd
import pickle
import plotly.express as px
import warnings

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from yellowbrick.cluster import KElbowVisualizer

with open('./datasets/mod_05_topic_10_various_data.pkl', 'rb') as fl:
    datasets = pickle.load(fl)

concrete = datasets['concrete']
print(concrete.shape)
concrete.head()

# %%
# 2. Create a new Components feature

components = ['Cement',
              'BlastFurnaceSlag',
              'FlyAsh',
              'Water',
              'Superplasticizer',
              'CoarseAggregate',
              'FineAggregate']

concrete['Components'] = concrete[components].gt(0).sum(axis=1)

concrete[components + ['Components']].head(10)

# %%
# 3. Data set normalization

scaler = StandardScaler().set_output(transform='pandas')

X = scaler.fit_transform(concrete)

# %%
# 4. Determination of the optimal number of clusters

model_kmn = KMeans(random_state=42)

visualizer = KElbowVisualizer(
    model_kmn,
    k=(2, 10),
    timings=False)


with warnings.catch_warnings():
    warnings.simplefilter('ignore')

    visualizer.fit(X)

visualizer.show()

# Optimal number of clusters is 5

# %%
# 5. Clustering

k_best = visualizer.elbow_value_

model_kmeans = KMeans(n_clusters=k_best, random_state=42).fit(X)

labels_kmeans = pd.Series(model_kmeans.labels_, name='Clusters')

# %%
# 6. Descriptive statistics of clusters

concrete_cluster = concrete.copy()
concrete_cluster["Clusters"] = labels_kmeans

report = concrete_cluster.groupby("Clusters").mean()
report

# %%
# 7. The number of recipes per cluster

recipes = concrete_cluster["Clusters"].value_counts().sort_index()

report["Recipes"] = recipes
report

# %%
# 8. Conclusions
# Most important influential features for clustering

centroids = model_kmeans.cluster_centers_

# Convert to DataFrame for better readability
centroids_df = pd.DataFrame(centroids, columns=X.columns)
variances = centroids_df.var()
variances

# From the analysis of the dispersion of the centroids of each cluster, it can
# be concluded that clustering is most affected by number of components, amount
# of fly ash and blast furnace slag.

# %%
# Clusters visualization

fig = px.scatter_3d(concrete_cluster,
                    x='Components',
                    y='FlyAsh',
                    z='BlastFurnaceSlag',
                    color='Clusters',
                    title='Concrete Cluster Plot')

fig.show()

# %%
# The following conclusions can be drawn from the analysis of the performed
# clustering:
# * Cluster 0 is a six-component mixture in which Slag is missing;
# * Cluster 1 - a five- or six-component mixture, in which Ash is missing and
# a low amount of Plasticizer;
# * Cluster 2 - the most popular seven-component mixture, in which all the
# components are present, which are the cheapest;
# * Cluster 3 is a high-strength and expensive six-component mixture in which
# there is only a small amount of Ash, but a high content of Plasticizer;
# * Cluster 4 is a four-component mixture that lacks Slag and Ash and a small
# amount of Plasticizer.