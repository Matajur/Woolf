# 1. Import of the required packages

import warnings
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from scipy.stats import zscore
from sklearn.datasets import fetch_california_housing
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

# %%
# 2. Download the California Housing dataset

california_housing = fetch_california_housing(as_frame=True)

data = california_housing['frame']
data.head()

# %%
# Primary exploratory data analysis
# Defining the target variable

target = data.pop('MedHouseVal')
target.head()

# %%
# Checking data types and missing values

data.info()

# %%
# Features distribution

sns.set_theme()

melted = pd.concat([data, target], axis=1).melt()

g = sns.FacetGrid(melted,
                  col='variable',
                  col_wrap=3,
                  sharex=False,
                  sharey=False)

# The 'warnings' package hides all possible warnings during the code execution
with warnings.catch_warnings():
    warnings.simplefilter('ignore')

    g.map(sns.histplot, 'value')

g.set_titles(col_template='{col_name}')

g.tight_layout()

# %%
# 3. Additional data preprocessing
# 3.1 Outlier cleaning for AveRooms, AveBedrms, AveOccup and Population columns

features_of_interest = ['AveRooms', 'AveBedrms', 'AveOccup', 'Population']
data[features_of_interest].describe()

# %%
# An outlier is identified by the "three sigma" rule — to consider as outliers
# values ​​of characteristics that deviate from the average by more than three
# standard deviations.

z_scores = data[features_of_interest].apply(zscore)
outlier_mask = (z_scores.abs() > 3).any(axis=1)

clean_data = data[~outlier_mask]
clean_target = target[~outlier_mask]
clean_data.shape

# %%
# Selection of features for modeling

fig, ax = plt.subplots(figsize=(6, 5))

sns.scatterplot(
    data=clean_data,
    x='Longitude',
    y='Latitude',
    size=clean_target,
    hue=clean_target,
    palette='viridis',
    alpha=0.5,
    ax=ax)

plt.legend(
    title='MedHouseVal',
    bbox_to_anchor=(1.05, 0.95),
    loc='upper left')

plt.title('Median house value depending of\n their spatial location')

# %%
# 3.2 Removal from a set of features with high correlation between themselves
# Correlation matrix

columns_drop = ['Longitude', 'Latitude']
subset = pd.concat([clean_data, clean_target],
                   axis=1).drop(columns=columns_drop)

corr_mtx = subset.corr()

mask_mtx = np.zeros_like(corr_mtx)
np.fill_diagonal(mask_mtx, 1)

fig, ax = plt.subplots(figsize=(7, 6))

# The mask is used in the correlation heatmap to hide the diagonal
sns.heatmap(subset.corr(),
            cmap='coolwarm',
            center=0,
            annot=True,
            fmt='.2f',
            linewidth=0.5,
            square=True,
            mask=mask_mtx,
            ax=ax)

# %%
# AveRooms and MedInc have 66% correlation between them. AveRooms to be deleted
# because it has lower correlation with the target MedHouseV

clean_data = clean_data.drop(columns=["AveRooms"])
clean_data.shape

# %%
# 4. Breakdown of the data set into training and test samples

X_train, X_test, y_train, y_test = train_test_split(
    clean_data,
    clean_target,
    test_size=0.2,
    random_state=42)

# %%
# 5. Normalization of features

scaler = StandardScaler().set_output(transform='pandas').fit(X_train)

X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)

X_train_scaled.describe()

# %%
# 6. Model construction

model = LinearRegression().fit(X_train_scaled, y_train)
y_pred = model.predict(X_test_scaled)

ymin, ymax = y_train.agg(['min', 'max']).values

# Clip method is used to ensure that there are no unreal prices as 0 or infinity
y_pred = pd.Series(y_pred, index=X_test_scaled.index).clip(ymin, ymax)
y_pred.head()

# %%
# 7. Assessment of model accuracy

r_sq = model.score(X_train_scaled, y_train)
mae = mean_absolute_error(y_test, y_pred)
mape = mean_absolute_percentage_error(y_test, y_pred)

print(f'R2: {r_sq:.2f} | MAE: {mae:.2f} | MAPE: {mape:.2f}')

# %%
# Model coefficients

pd.Series(model.coef_, index=X_train_scaled.columns)

# %%

pd.Series(model.intercept_, name="Intercept")

# %%
# 8. Conclusions
# The accuracy of the model has been increased by about 2% compared to the
# model given in the outline. Thus, MAE decreased from 52 to 50%, and MAPE from
# 31 to 29%. R2 increased from 0.61 to 0.64.
