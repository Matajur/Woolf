# Tier 2. Module 5 - Relational databases: Concepts and Techniques

## Final assignment

### Technical Task

1. Load the data:
* Create the `pandemic` schema in the database using SQL.
* Select it as the default schema using SQL.
* Import the [data](https://drive.google.com/file/d/1lHEXJvu2omYRgvSek6mHq-iQ3RmGAQ7e/view?usp=sharing) using the Import wizard.
* Review the data for context.

2. Normalize the infectious_cases table to 3rd normal form. Save two tables with normalized data in the same schema.

3. Analyze the data:
* For each unique combination of `Entity` and `Code` or their `id`, calculate the average, minimum, maximum, and sum for the `Number_rabies` attribute.
* Sort the result by the calculated average in descending order.
* Select only 10 rows to display.

4. Build a difference in years column.
For the original or normalized table, for the `Year` column, build using built-in SQL functions:
* an attribute that creates the date of January 1 of the corresponding year,
* an attribute that is equal to the current date,
* an attribute that is equal to the difference in years of the two columns mentioned above.

5. Build your own function.
* Create and use a function that builds the same attribute as in the previous task: the function should take the year value as input and return the difference in years between the current date and the date created from the year attribute (1996 → ‘1996-01-01’).

### Acceptance criteria

1. Attached links to the goit-rdb-fp repository and directly the repository files themselves as an archive.
2. Created a schema in the database. Imported data.
3. Normalized the table.
4. Written SQL queries in accordance with the specified execution conditions. The queries are executed and give the expected result, namely:
* average, minimum, maximum value and sum for the `Number_rabies` attribute. The output is in accordance with the above requirements for sorting and number of rows;
* column of difference in years using built-in SQL functions;
* function for calculating the difference in years or the number of diseases for a certain period. The function returns the necessary data.
