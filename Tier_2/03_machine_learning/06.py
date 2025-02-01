# 1. Import of the required packages

import warnings
import pandas as pd
import numpy as np
from sklearn.metrics import ConfusionMatrixDisplay, classification_report
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from imblearn.over_sampling import SMOTE
import seaborn as sns
import matplotlib.pyplot as plt

# %%
# 2. Download the Rain in Australia dataset

data = pd.read_csv('./datasets/weather_data.csv.gz')
data.shape

# %%
data.head()

# %%
data.dtypes

# %%
# 3. Separation of the data set into training and test samples
# 3.1. Removing features with a large number of missing values
# Check for missing values

data.isna().mean().sort_values(ascending=False)

# %%
# Plot of the nan values distribution in the dataset
with warnings.catch_warnings():
    warnings.simplefilter('ignore')
    tmp = (data
           .groupby('Location')
           .apply(lambda x:
                  x.drop(['Location', 'Date'], axis=1)
                  .isna()
                  .mean()))

plt.figure(figsize=(9, 13))

ax = sns.heatmap(tmp,
                 cmap='Blues',
                 linewidth=0.5,
                 square=True,
                 cbar_kws=dict(
                     location="bottom",
                     pad=0.01,
                     shrink=0.25))

ax.xaxis.tick_top()
ax.tick_params(axis='x', labelrotation=90)

# %%
# Removing columns where the number of nan values is greater than 35%
data = data[data.columns[data.isna().mean().lt(0.35)]]

# # Removing  nan values from the target column
data = data.dropna(subset='RainTomorrow')

data.isna().mean().sort_values(ascending=False)

# %%
# 3.2. Subsets of a data set with numerical and categorical features

data_num = data.select_dtypes(include=np.number)
data_cat = data.select_dtypes(include='object')

# %%
# Numerical features distribution

melted = data_num.melt()

g = sns.FacetGrid(melted,
                  col='variable',
                  col_wrap=4,
                  sharex=False,
                  sharey=False,
                  aspect=1.25)

g.map(sns.histplot, 'value')

g.set_titles(col_template='{col_name}')

g.tight_layout()

# %%
# Categorical features

data_cat.nunique()

# %%

data_cat.apply(lambda x: x.unique()[:5])

# %%
# 3.3. Changing the Date column type to datetime type and creating additional Year and Month columns

data_cat['Date'] = pd.to_datetime(data['Date'])  # add Date column to df

data_cat['Year'] = (data_cat['Date'].dt.year.astype(str))
data_cat['Month'] = (data_cat['Date'].dt.month.astype(str))

data_cat.drop('Date', axis=1, inplace=True)  # Remove Date column

data_cat[['Year', 'Month']].head()

# %%
# 3.4. Moving the Year column from a subset with categorical attributes to a subset with numeric attributes

data_num['Year'] = data_cat['Year'].astype(int)

data_cat.drop('Year', axis=1, inplace=True)

# %%
# 3.5. Split the subsets into training and test samples

X_train_num = data_num[data_num["Year"] != data_num["Year"].max()]
X_test_num = data_num[data_num["Year"] == data_num["Year"].max()]

print(X_train_num.shape, X_test_num.shape)

X_train_cat = data_cat[data_num["Year"] !=
                       data_num["Year"].max()].drop('RainTomorrow', axis=1)
X_test_cat = data_cat[data_num["Year"] ==
                      data_num["Year"].max()].drop('RainTomorrow', axis=1)

print(X_train_cat.shape, X_test_cat.shape)

y_train = data_cat[data_num["Year"] !=
                   data_num["Year"].max()][["RainTomorrow"]].squeeze()
y_test = data_cat[data_num["Year"] ==
                  data_num["Year"].max()][["RainTomorrow"]].squeeze()

print(y_train.shape, y_test.shape)

# %%
# 4. Recovery of lost data
# Numerical features

num_imputer = SimpleImputer(strategy="mean").set_output(transform='pandas')
X_train_num = num_imputer.fit_transform(X_train_num)
X_test_num = num_imputer.transform(X_test_num)

pd.concat([X_train_num, X_test_num]).isna().sum()

# %%
# Categorical features

cat_imputer = SimpleImputer(
    strategy='most_frequent').set_output(transform='pandas')
X_train_cat = cat_imputer.fit_transform(X_train_cat)
X_test_cat = cat_imputer.transform(X_test_cat)

pd.concat([X_train_cat, X_test_cat]).isna().sum()

# %%
# 5. Data normalization

scaler = StandardScaler().set_output(transform='pandas')

X_train_num = scaler.fit_transform(X_train_num)
X_test_num = scaler.transform(X_test_num)

# %%
# 6. Onehot encoding of categorical variables

encoder = (OneHotEncoder(drop='if_binary',
                         sparse_output=False)
           .set_output(transform='pandas'))

X_train_cat = encoder.fit_transform(X_train_cat)
X_test_cat = encoder.transform(X_test_cat)

X_train_cat.shape

# %%
# 7. Combining subsets with numerical and categorical features and building a model
# Combining subsets

X_train = pd.concat([X_train_num, X_train_cat], axis=1)
X_test = pd.concat([X_test_num, X_test_cat], axis=1)

X_train.shape

# %%
# Distribution of the target variable

y_train.value_counts(normalize=True)

# %%
# Building the model

model = (LogisticRegression(solver='liblinear',
                            class_weight='balanced',
                            random_state=42)
         .fit(X_train, y_train))

pred = model.predict(X_test)

# %%
# 8. Assessment of model accuracy
# Confusion matrix

ConfusionMatrixDisplay.from_predictions(y_test, pred)

# %%
# Classification report

print(classification_report(y_test, pred))

# %%
# 9. Data augmentation

sm = SMOTE(random_state=42, k_neighbors=15)
X_res, y_res = sm.fit_resample(X_train, y_train)

y_res.value_counts(normalize=True)

# %%

model_res = (LogisticRegression(solver='liblinear',
                                class_weight='balanced',
                                random_state=42)
             .fit(X_res, y_res))

pred_res = model.predict(X_test)

print(classification_report(y_test, pred_res))

# %%
# 10. Changing the solver of the LogisticRegression (saga, newton-cg, lbfgs, sag)

model_saga = (LogisticRegression(solver='saga',
                                 class_weight='balanced',
                                 random_state=42)
              .fit(X_train, y_train))

pred_saga = model.predict(X_test)

print(classification_report(y_test, pred_saga))

# %%
# 11. Increasing threshold

threshold = 0.6

y_pred_proba = pd.Series(model.predict_proba(X_test)[:, 1])
pred_proba = y_pred_proba.apply(lambda x: "Yes" if x > threshold else "No")

print(classification_report(y_test, pred_proba))

# %%
# 12. Conclusion
# The selection of data for the last year of observation in the test set made it possible to take into account the dynamics of climate change over the past 10 years (the dataset contains data from 2007 to 2017) and improve the accuracy of the model by 1%.
# Oversampling of rainy days, as well as changing the hyperparameters of the model itself, do not provide a further increase in accuracy.
# However, increasing the threshold value of the classifier up to 0.6 allows to raise the accuracy of the model by another 3% to 83% at a constant value of f1-score.
