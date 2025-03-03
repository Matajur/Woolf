# Tier 2. Module 5 - Relational databases: Concepts and Techniques

## Homework for Topic 7 - Additional built-in SQL functions. Working with time

The goal of this exercise is to practice using basic SQL time functions and work a little with JSON attributes. These skills are essential for solving real-world problems in analytics, software development, and big data processing.

### Technical Task

1. Write an SQL query that extracts the year, month, and day from the `date` attribute for the `orders` table. Print them as three separate attributes, along with the `id` attribute and the original `date` attribute (for a total of 5 attributes).
2. Write an SQL query that adds one day to the `date` attribute for the `orders` table. Print the `id` attribute, the original `date` attribute, and the result of the addition.
3. Write an SQL query that displays the number of seconds since the beginning of the countdown for the `date` attribute for the `orders` table (shows its timestamp value). To do this, you need to find and apply the necessary function. Print the `id` attribute, the original `date` attribute, and the result of the function.
4. Write an SQL query that counts how many rows the `orders` table contains with the `date` attribute between `1996-07-10 00:00:00` and `1996-10-08 00:00:00`.
5. Write an SQL query that displays the `id` attribute, the `date` attribute, and the JSON object `{"id": <row id attribute>, "date": <row date attribute>}` for the `orders` table. Use the function to create the JSON object.

### Acceptance criteria

1. Attached are links to the goit-rdb-hw-07 repository and the repository files themselves as an archive.
2. All 5 queries are written according to the specified execution conditions. SQL queries are executed and return the required data.
