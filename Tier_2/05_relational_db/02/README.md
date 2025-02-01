# Tier 2. Module 5 - Relational databases: Concepts and Techniques

## Homework for Topic 2 - Database design using semantic models

Mastering the practical aspects of implementing the concepts of database normalization and entity-relationship (ER) modeling; mastering the skills of creating effective and well-structured information management systems.

To do:

* convert the initial table to a state that meets the requirements of the first, second, and third normal forms;
* create an ER diagram that reflects the relationships between entities;
* create tables in the database based on the ER diagram.

Objectives:

* Master the technique of converting data into a normalized form to ensure its efficiency and consistency.
* Understand how to define and model entities and their relationships, which is important for the correct organization of information in the database.

### Technical Task

1. Transform the original table into first normal form.
2. Transform the new tables into second normal form.
3. Transform the new tables into third normal form.
4. Develop an ER diagram of the resulting tables.
5. Using the ER diagram, create tables in the database. Design these tables without specific values, only taking into account the columns and their relationships, manually or automatically.

**Initial table**

| Order_number | Product_name & quantity | Client_address    | Order_date | Client    |
|--------------|-------------------------|-------------------|------------|-----------|
| 101          | Laptop: 3, Mouse: 2     | 23 Wall Street    | 1987-10-19 | Dow Jones |
| 102          | Printer: 1              | 221B Baker Street | 1954-01-06 | Holmes    |
| 103          | Mouse: 4                | 3 Abbey Road      | 1969-09-26 | Martin    |

### Acceptance criteria

1. Attached links to the goit-rdb-hw-02 repository and directly the repository files themselves as an archive.
2. Normalized the table to 1NF.
3. Normalized the table to 2NF.
4. Normalized the table to 3NF.
5. Created an ER diagram of the resulting tables. The diagram should correspond to the normalized tables.
6. Used clear and specific names for entities and attributes. Specified data types for attributes. All relations and attributes have clear and understandable cardinalities and values.
7. Created tables in the database (only tables and columns taking into account relationships) manually or automatically.
