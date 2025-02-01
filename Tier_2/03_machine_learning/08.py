# 1. Import of the required packages

import pandas as pd
import numpy as np
from category_encoders import TargetEncoder
from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import PowerTransformer
from sklearn.metrics import mean_absolute_percentage_error
import seaborn as sns
import matplotlib.pyplot as plt
from ydata_profiling import ProfileReport

# %%
# 2. Data loading

data = pd.read_csv('./datasets/mod_04_hw_train_data.csv', sep=',')
data.shape

# %%
data.head()

# %%
# 3. Exploratory data analysis

data.info()

# Birthday is a string type, not a datetime, for further analysis it's needed
#  to change the format of this column.

# %%
data.describe()

# %%
data.skew(numeric_only=True)

# Experience and salary deviate slightly from the normal distribution to the
# left (small values ​​prevail over large ones), which is natural for any
# profession when there are fewer young professionals than experienced ones.
# But the kNN method requires reducing asymmetry to improve predictions.

# %%
data.isna().sum()

# The number of empty values ​​in the dataframe is very small, so it's easier
# to just remove the lines that contain nan.
# The value of NaN in the experience column may mean a lack of experience or a
# data entry error. Donald Perkins has too high a salary for an employee with
# no experience. It is not clear whether it is related to the previous work, or
# it is really an input error, so it is better to delete all NaN in the salary
# column as well.

# %%
report = ProfileReport(data)
report.to_notebook_iframe()

# From the report, it can be seen that among the training sample, all employees
# have a higher education, at the same time, among them there are many people
# under the age of 22-23, which does not correlate with the availability of a
# higher education. In addition, almost all birthdays are unique dates, which
# is unlikely in a real-life situation.

# %%
# From the previous analysis of the data, it can be concluded that the name
# and phone number are not suitable for salary prediction, so they should be
# removed. Also the birthdays should be deleted, because the data in this
# column cannot be considered as reliable.

# %%
# Remove all rows with any NaN values

df_clean = data.dropna()
df_clean.shape

# %%
# Drop Name and Phone columns

df_clean = df_clean.drop(["Name", "Phone_Number", "Date_Of_Birth"], axis=1)
df_clean.shape

# %%
# 4. Data processing
# 4.1. Preprocessing of numerical features

# %%
df_clean.describe()

# %%
# Numerical features distribution
data_num = df_clean.select_dtypes(include=np.number)
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

# From these graphs, we can conclude that a third of the company's
# employees have 5 or more years of experience, and at the same
# time, a quarter of the company is under 30 years old. The fact
# that all experienced workers were recorded in the same category
# can make predictions difficult.

# %%
# Definition of numerical features closely correlated with other features

mtx = df_clean.corr(numeric_only=True).abs()

fig, ax = plt.subplots(figsize=(8, 8))

sns.heatmap(mtx,
            cmap='crest',
            annot=True,
            fmt=".2f",
            linewidth=.5,
            mask=np.triu(np.ones_like(mtx, dtype=bool)),
            square=True,
            cbar=False,
            ax=ax)

# Salary is strongly correlated with experience, but not at all
# with age, so the previous claim that previous work experience
# can strongly influence salary has been shown to be incorrect.

# %%
# 4.2. Preprocessing of categorical features
# Overview of categorical features

df_clean.select_dtypes(include='object').nunique()

# %%
# 4.3. Splitting the dataset into features (X) and target (y)

X_train = df_clean.drop(['Salary'], axis=1)
y_train = df_clean['Salary']

# %%
# 4.4. Coding of categorical variables

cat_cols = X_train.select_dtypes(include='object').columns

# %%
# Coding with target encoder

target_encoder = TargetEncoder(cols=cat_cols)
X_train_target = target_encoder.fit_transform(X_train, y_train)

# %%
# 4.5. Normalization of variables. Reduction of asymmetry

power_transform = PowerTransformer().set_output(transform='pandas')
X_train_power_target = power_transform.fit_transform(X_train_target)
X_train_power_target.skew()

# %%
# 5. Building the model

knn_mod = KNeighborsRegressor(
    n_neighbors=7).fit(X_train_power_target, y_train)

# %%
# 6. Processing and preparation of data for the validation set

v_data = pd.read_csv('./datasets/mod_04_hw_valid_data.csv', sep=',')

valid_data = v_data.drop(["Name", "Phone_Number", "Date_Of_Birth"], axis=1)

data_num = valid_data.select_dtypes(include=np.number)
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
# The test set contains data samples with experience greater than 5, while the
# training set only contains samples up to and including 5. To homogenize the
# data, we decide to replace experience greater than 5 with 5.

valid_data.loc[valid_data['Experience'] > 5, 'Experience'] = 5

X_test = valid_data.drop(['Salary'], axis=1)
y_test = valid_data['Salary']

X_test_target = target_encoder.transform(X_test, y_test)

X_test_power_target = power_transform.transform(X_test_target)

# %%
# 7. Salary forecast

y_pred_power_target = knn_mod.predict(X_test_power_target)

mape = mean_absolute_percentage_error(y_test, y_pred_power_target)

print(f'Validation MAPE: {mape:.2%}')
