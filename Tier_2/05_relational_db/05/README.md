# Tier 2. Module 5 - Relational databases: Concepts and Techniques

## Homework for Topic 5 - Nested queries. Code reuse

As part of this homework assignment, it's required to use nested SQL queries, which is an important part of learning about relational databases. Using nested queries in SQL is a powerful tool for retrieving and processing data from multiple tables, allowing you to solve complex problems and optimize your database operations.

### Technical Task

1. Write an SQL query that will display the order_details table and the customer_id field from the orders table, respectively, for each field of a record from the order_details table.
This should be done using a nested query in the SELECT statement.
2. Write an SQL query that will display the order_details table. Filter the results so that the corresponding record from the orders table satisfies the condition shipper_id=3.
This should be done using a nested query in the WHERE statement.
3. Write an SQL query, nested in the FROM statement, that will select rows with the condition quantity>10 from the order_details table. For the obtained data, find the average value of the quantity field — group by order_id.
4. Solve problem 3 using the WITH statement to create a temporary table temp.
5. Create a function with two parameters that will divide the first parameter by the second. Both parameters and the return value must be of type FLOAT.
Use the DROP FUNCTION IF EXISTS construct. Apply the function to the quantity attribute of the order_details table. The second parameter can be any number you want.

### Acceptance criteria

1. Attached are links to the goit-rdb-hw-05 repository and the repository files themselves as an archive.
2. All 5 SQL queries have been written in accordance with the specified execution conditions. The queries are executed and give the expected result.
