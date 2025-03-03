# Tier 2. Module 5 - Relational databases: Concepts and Techniques

## Homework for Topic 4 - Data loading and SQL basics. DQL commands

This task will cover the process of defining the structure of tables using DDL commands, populating them with test data using DML commands, and will also help you develop skills in writing complex queries using multiple JOIN operators to join tables.

### Technical Task

1. Create a database to manage the book library according to the structure below. Use DDL commands to create the necessary tables and their relationships.

Database Structure

a. Schema Name — “LibraryManagement”

b. Table "authors":
* author_id (INT, auto-incrementing PRIMARY KEY)
* author_name (VARCHAR)

c. Table "genres":
* genre_id (INT, auto-incrementing PRIMARY KEY)
* genre_name (VARCHAR)

d. Table "books":
* book_id (INT, auto-incrementing PRIMARY KEY)
* title (VARCHAR)
* publication_year (YEAR)
* author_id (INT, FOREIGN KEY relation to "Authors")
* genre_id (INT, FOREIGN KEY relation to "Genres")

e. Table "users":
* user_id (INT, auto-incrementing PRIMARY KEY)
* username (VARCHAR)
* email (VARCHAR)

f. Table "borrowed_books":
* borrow_id (INT, auto-incrementing PRIMARY KEY)
* book_id (INT, FOREIGN KEY relation to "Books")
* user_id (INT, FOREIGN KEY relation to "Users")
* borrow_date (DATE)
* return_date (DATE)

2. Fill the tables with simple, fictional test data. One or two rows per table are enough.

3. Switch to the database you worked with in topic 3. Write a query using the FROM and INNER JOIN operators that joins all the data tables that we loaded from the files: order_details, orders, customers, products, categories, employees, shippers, suppliers. To do this, you need to find common keys.
Check that the query is executed correctly.

4. Run the queries listed below.
* Determine how many rows you got.
* Change several INNER operators to LEFT or RIGHT. Determine what happens to the number of rows. Why? Write the answer in a text file.
* Select only rows where employee_id > 3 and ≤ 10.
* Group by category name, count the number of rows in the group ans the average product quantity.
* Filter out rows where the average product quantity is greater than 21.
* Sort the rows in descending order of the number of rows.
* Display (select) four rows with the first row omitted.

### Acceptance criteria

1. Attached are links to the goit-rdb-hw-04 repository and the repository files themselves as an archive.
2. A database with the necessary structure has been created.
3. The tables have been filled with test data.
4. The SQL commands for each item or subitem are executed and give the expected result (create tables or perform certain operations with data).
5. Answers to the questions in the 4th item have been given.
