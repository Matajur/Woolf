# Tier 3. Module 4 - Career Strategies and Soft Skills for IT Professionals

## Topic 8. DS&DA Test Task

### Churn prediction. Technical task

#### General Description

[Link to the Kaggle competition](https://www.kaggle.com/competitions/test-task-for-ds-churn-prediction-2026-01)

The ability to solve machine learning problems on structured tabular data is important because most businesses store critical information in tabular format, such as databases or spreadsheets containing customer data, sales, financial transactions, and other business processes.

Using this "raw" data for modeling allows you to extract some knowledge about deep dependencies for further decision-making. This allows companies to reduce costs, increase efficiency, personalize customer service, and, as a result, gain a competitive advantage in the market.

The task of **predicting customer churn** (Churn prediction) is to determine which customers of a company are likely to stop using its services or products within a certain period of time.

The fact of **churn** is usually encoded with a label (0 or 1) and indicates customers who will stop using a product or service within a certain period of time. Customers abandon services for various reasons, such as poor service, product dissatisfaction, price sensitivity, better alternatives, and changes in circumstances, such as moving. Data analysts find signs that may affect churn, and machine learning predictive models will be created accordingly.

#### Data source

A **customized dataset** was created to work on the test task. The original data source is https://www.kaggle.com/datasets/fridrichmrtn/user-churn-dataset. The dataset contains information about users and their activity parameters on the e-commerce platform: platform session time, session frequency, transaction revenue, product data, data on the day and month of platform use, etc.

#### Problem statement

It is necessary to perform preliminary research, process data, and build binary classification models for the customer churn prediction task.

The following files are available on the competition page:

- train.csv (training data);
- test.csv (open test set);
- sample_submission.csv (example of response upload format).

#### Competition metric

The competition metric is the **Matthews Correlation Coefficient (MCC) score**, which is used to determine the quality of classification models, especially when there is imbalance between classes. It takes into account all four components of the discrepancy matrix (True Positive, False Positive, True Negative, False Negative), making it one of the most balanced metrics for evaluating a classifier.

MCC values can range from -1 to +1.

**A value close to 1.** Perfect classification. This means that the model correctly predicted all positive and negative cases.

**A value close to 0.** The classification is equivalent to a random guess. This result indicates that the model is no better than random selection.

**A value close to -1.** Completely incorrect classification. This means that the model predicts all cases in reverse (for example, all true positives were classified as negatives, and all negatives as positives).

More about the metric at the links: https://scikit-learn.org/stable/modules/generated/sklearn.metrics.matthews_corrcoef.html, https://www.activeloop.ai/resources/glossary/matthews-correlation-coefficient-mcc/

#### Data description

Dataset [Fridrich, M., & Dostál, P. (2022). User Churn Model in E-Commerce Retail. Scientific Papers of the University of Pardubice, Series D: Faculty of Economics and Administration, 30(1). https://doi.org/10.46585/sp28031105] contains the following features:

| Feature group           | Feature                                 | Feature description                                                                  | Name                   | Data type    |
| ----------------------- | --------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------- | ------------ |
| Age                     | Session age                             | Difference in time between the user's last session and the current date (days)       | ses_rec                | float        |
|                         | Average session age                     | Average period between sessions (days)                                               | ses_rec_avg            | float        |
|                         | Standard deviation of session age       | Average deviation of time between sessions (days)                                    | ses_rec_sd             | float        |
|                         | Coefficient of variation of session age | Ratio of standard deviation of session age to average session time (%)               | ses_rec_cv             | float        |
|                         | User maturity                           | Difference between the start of the user's first session and the current date (days) | user_rec               | float        |
| Frequency               | Session frequency                       | Number of sessions                                                                   | ses_n                  | int          |
|                         | Relative session frequency              | Ratio of session frequency to user maturity                                          | ses_n_r                | float        |
|                         | User Interaction Frequency              | User-Platform Interaction (Clicks, Views, Add to Cart)                               | int_n                  | int          |
|                         | Relative User Interaction Frequency     | Ratio of User-Platform Interaction to Session Frequency                              | int_n_r                | float        |
|                         | Transaction Frequency                   | Number of Transactions                                                               | tran_n                 | int          |
|                         | Relative Transaction Frequency          | Ratio of Transaction Frequency to Session Frequency                                  | tran_n_r               | float        |
| Money                   | Transaction Revenue                     | Total Revenue ($)                                                                    | rev_sum                | float*<*/td> |
|                         | Relative Transaction Revenue            | Ratio of Total Revenue to Session Frequency ($/session)                              | rev_sum_r              | float        |
|                         | Above Average Transaction Revenue       | Share of Sessions with Above Average Revenue (%)                                     | major_spend_r          | float        |
| Categories and Products | Category Interactions                   | Sum of User Activities with Basic Product Categories                                 | int_cat1_n:int_cat24_n | float        |

The above features describe user behavior on an e-commerce platform in a certain way. It can be expected that the behavior patterns of users who are completely satisfied with the platform and use it frequently will differ from the behavior of users who do not plan to use the platform in the future. That is, these features may be an indicator of potential customer churn for some users.

#### Useful tips for participating in the competition

1. Carefully perform descriptive data analysis. Determine the degree of data balance, the presence of anomalies, missing values, and features with low variance of values.
2. Perform data preprocessing in accordance with the conclusions of the previous stage.
3. Consider using ensemble methods for building machine learning models.
4. To improve the accuracy of the models, automate the process of finding a set of optimal hyperparameters.
