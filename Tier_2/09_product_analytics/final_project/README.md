# Tier 2. Module 9 - Product Analytics and Applied Statistics

## Final assignment

### Technical Task

Your team has decided to try a new approach to online advertising for a product. To determine if the idea works, they decide to conduct an A/B test, where the control group will be given the same approach, while the test group will be given the new approach.

#### Task 1

Prepare a test plan for conducting such an experiment.

#### Task 2

Create a short tracking plan to track detailed user behavior and compare the performance of two groups at the level of relevant events with a description of the attributes necessary for analysis.

We simulate an experiment where you receive daily information about spending and sales funnel progress.

Here are the results:

[Control group](https://drive.google.com/file/d/1OlboUFclx-9QAakDNUAMzQquH8tNzo07/view?usp=sharing)

[Test group](https://drive.google.com/file/d/1fFIA1tJj5YQs2G7tv244tgzLhpJ5axoG/view?usp=sharing)

Dataset field descriptions:

- **Campaign Name**: Campaign name as part of the test;
- **Date**: Date;
- **Spend**: Advertising spend in dollars;
- **# of Impressions**: Number of impressions of the ad within the campaign per day;
- **Reach**: Number of unique impressions;
- **# of Website Clicks**: Number of clicks on the ad
- **# of Searches**: Number of users who used the search on the site
- **# of View Content**: Number of users who viewed content and products on the site
- **# of Add to Cart**: Number of users who added products to the cart
- **# of Purchase**: Number of purchases

#### Task 3

Use a convenient (and appropriate) method to calculate the test results and their statistical significance (e.g. `stats.ttest_ind` from `scipy` or any tool you are comfortable with).

Interpret the result.

#### Task 4

Visualize the funnel for the test and control groups. You can use any tool you are comfortable with: Python, Tableau, Power BI, Excel/Google Sheets.

Think about what conclusions you can draw.

#### Task 5

Calculate the confidence interval in the difference in purchase step conversion after adding a product to the card.
