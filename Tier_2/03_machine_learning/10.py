# 1. Loading the Autos dataset
import matplotlib.pyplot as plt
import pandas as pd
import pickle
import seaborn as sns

from category_encoders import TargetEncoder
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.feature_selection import mutual_info_regression
from sklearn.preprocessing import StandardScaler

with open('./datasets/mod_05_topic_10_various_data.pkl', 'rb') as fl:
    datasets = pickle.load(fl)

autos = datasets['autos']
print(autos.shape)
autos.head()

# %%
# Feature engineering
# Calculate and add the stroke ratio column to improve the quality of the model

autos['stroke_ratio'] = autos['stroke'] / autos['bore']

autos[['stroke', 'bore', 'stroke_ratio']].head()

# %%
# 2. Definition of the list of discrete features
# Calculation of the index of mutual information requires the explicit
# definition of discrete features and the transformation of categorical
# features into discrete ones.

autos.info()

# %%
autos.describe()

# %%
# 2.1. Definition of discrete features
# From the analysis of the data set, we can conclude that the number of doors
# and cylinders are discrete features.

disc_features = ["num_of_doors", "num_of_cylinders"]

# %%
# 2.2. Definition of categorical features

X = autos.copy()
y = X.pop('price')

cat_features = X.select_dtypes('object').columns

# %%
# Transformation of categorical features into discrete.
for colname in cat_features:
    X[colname], _ = X[colname].factorize()

# %%
# 3. Calculation of the index of mutual information

mi_scores = mutual_info_regression(
    X, y,
    discrete_features=X.columns.isin(cat_features.to_list() + disc_features),
    random_state=42)

mi_scores = (pd.Series(mi_scores, name='MI Scores',
             index=X.columns).sort_values())

mi_scores.sample(5)

# It is interesting to note that the addition of a new feature "Stroke ratio"
# did not improve this dataset, because the index of mutual information of the
# new feature turned out to be smaller than the index for "Bor" and on the same
# level as the "Stroke" included in it.

# %%
(pd.Series(
    data=mi_scores,
    index=X.columns)
    .sort_values(ascending=True)
    .plot
    .barh())

plt.show()

# %%
# 4. Construction of a regression model-ensemble

# In this task, it is not required to evaluate the quality of the model,
# instead, it is necessary to evaluate the importance of each of the input
# features for a particular model. In addition, the number of samples is
# relatively small in this data set, and the rule of thumb of a 1:10 ratio
# between the number of features and the number of samples does not hold.
# Therefore, we decide not to divide the data into a training and validation
# sample and to inflate the model on the full data set.

# 4.1. Features coding

X_train = autos.copy()
y_train = X_train.pop('price')

encoder = TargetEncoder()
X_train = encoder.fit_transform(X_train, y)

scaler = StandardScaler().set_output(transform='pandas')
X_train = scaler.fit_transform(X_train)

# %%
# 4.2. Random Forest Regressor

mod_rnd_frs = (RandomForestRegressor(random_state=42).fit(X_train, y_train))

(pd.Series(
    data=mod_rnd_frs.feature_importances_,
    index=X_train.columns)
    .sort_values(ascending=True)
    .plot
    .barh())

plt.show()

# %%
# 4.3. Gradient Boosting Regressor

mod_grd_bst = (GradientBoostingRegressor(
    learning_rate=0.3,
    subsample=0.75,
    max_features='sqrt',
    random_state=42).fit(X_train, y_train))

(pd.Series(
    data=mod_grd_bst.feature_importances_,
    index=X_train.columns)
    .sort_values(ascending=True)
    .plot
    .barh())

plt.show()

# %%
# 5. Unification of the features importance with the index of mutual information

mod_rnd_frs_feats = pd.Series(
    mod_rnd_frs.feature_importances_, index=X.columns)
mod_rnd_frs_feats_ranked = mod_rnd_frs_feats.rank(pct=True)

mod_grd_bst_feats = pd.Series(
    mod_grd_bst.feature_importances_, index=X.columns)
mod_grd_bst_feats_ranked = mod_grd_bst_feats.rank(pct=True)

# %%
# 6. Visualization of feature importances with the index of mutual information

features_df = pd.DataFrame({
    'Features': mi_scores.index,
    'Mutual Information Index': mi_scores.values,
    'Random Forest Regressor': mod_rnd_frs_feats_ranked.values,
    'Gradient Boosting Regressor': mod_grd_bst_feats_ranked.values,
})

# %%
# The DataFrame should be reshaped from wide format to long format for catplot

features_df_melted = features_df.melt(id_vars='Features', value_vars=['Mutual Information Index', 'Random Forest Regressor', 'Gradient Boosting Regressor'],
                                      var_name='Regressor', value_name='Feature importance')

# %%
sns.catplot(
    data=features_df_melted,
    kind='bar',
    x='Feature importance',
    y='Features',
    hue='Regressor',
    height=5,
    aspect=2
)

plt.show()

# %%
# 7. Conclusions

# As can be seen from the joint plot, the feature importances obtained by
# ifferent regressors have very little overlap. The mutual information index
# favors car weight, size, and engine power, while random forest and gradient
# boost favor number of doors, piston stroke, and fuel type. Part of the reason
# for this significant discrepancy is that the data set was not cleaned of
# multicollinearity, and one regressor might pick up one feature and ignore
# another collinear feature, while another regressor might do the opposite.
# The only thing in which all regressors are unanimous is that the newly formed
# feature of the stroke ratio does not add any quality to the already existing
# features.
