# Tier 1. Module 1: Introduction to Computer Programming (Python Foundations and Best Practices)


# Homework for Lesson 10 - Basics of working with classes
---

A function to display a list of colleagues with upcoming birthdays &amp; a bot assistant to manage a personal list of contacts

## General acceptance criteria

* The repository goitneo-python-hw-1-group-name has been created.
* The homework contains a link to the GitHub repository and an attached repository file in .zip format.
* The assignments are completed strictly per the technical description (recommendations for completion and evaluation criteria).
* The console has no errors or warnings when running the bot.
* The names of variables and functions are clear and descriptive.
* The code is properly formatted and complies with the PEP8 standard.

## Task #1

### Technical description

You need to implement a function to display a list of colleagues you need to congratulate on their birthdays this week.

You have a list of vocabularies called `users`; each vocabulary must have the keys `name` and `birthday`. This structure represents a model of a list of users with their names and birthdays. `Name` is a string with the user's name, and `birthday` is a `datetime` object containing the birthday date.

For example,

`{"name": "Bill Gates", "birthday": datetime(1955, 10, 28)}`

Your task is to write a function `get_birthdays_per_week` that takes a list of `users` as input and outputs to the console (using `print`) a list of users who need to be congratulated each day of the following week.

### Assessment Criteria

1. The get_birthdays_per_week function displays the names of birthdays in the format:

`Monday: Bill Gates, Jill Valentine`

`Friday: Kim Kardashian, Jan Koum`

2. Users who had their birthday on the weekend should be congratulated on Monday.
3. The function outputs users with birthdays a week ahead of the current day.
4. The week starts on Monday.

## Task #2

### Technical Description

Write a console bot assistant that recognizes commands from the keyboard and responds according to the command entered.

In this homework, we will focus on the bot's interface. A CLI (Command Line Interface) is the simplest and most convenient interface at the initial stage of development. CLI is quite simple to implement. Any CLI consists of three main elements:

* Command parser. The part is responsible for parsing the strings entered by the user and extracting keywords and command modifiers from the string.
* Command handlers are a set of functions, also called `handlers`, who are responsible for the immediate execution of commands.
* Request-response loop. This part of the application is responsible for receiving data from the user and returning the response to the user from the function, `handler`.

At the first stage, our bot assistant should be able to store a name and phone number, find a phone number by name, change the recorded phone number, and display all the records it has saved in the console. To implement this simple logic, we'll use a dictionary. In the dictionary, we will store the username as a key and the phone number as a value.

### Assessment Criteria

* The bot should stay in an endless loop, waiting for the user's command.
* The bot ends its work if it detects the words: "close" or "exit".
* The bot is not sensitive to the case of the entered commands.
* The bot accepts the following commands:

1. `"hello"`, and responds to the console with a following message — `"How can I help you?`"
2. `"add username phone"`. With this command, the bot saves a new contact in its memory, for example, in a dictionary. The user enters the name `username` and phone number `phone`, always separated by a space.
3. `"change username phone"`. With this command, the bot saves a new phone number `phone` for the `username` contact already existing in the address book.
4. `"phone username"`. With this command, the bot displays the phone number for the specified `username` contact in the console.
5. `"all"`. This command displays all saved contacts with phone numbers in the console.
6. `"close"` or `"exit"` — using any of these commands, the bot terminates its work after it displays the message `"Goodbye!"` in the console and completes its activity.

* The command logic is implemented in separate functions, and these functions take one or more strings as input and return a string.
* The whole logic of interaction with the user is implemented in the `main` function, and all `prints` and `inputs` occur only there.


# Homework for Lesson 11 - "Magic" methods
---

A virtual assistant with a command line interface (CLI)

## General acceptance criteria

* The repository goitneo-python-hw-1-group-name has been created.
* The homework contains a link to the GitHub repository and an attached repository file in .zip format.
* The assignments were completed precisely in accordance with the technical description (guidelines and evaluation criteria).
* There are no errors or warnings in the console when launching the bot.
* The names of variables and functions are clear and descriptive.
* The code is properly formatted and complies with the PEP8 standard.

## Task #1

### Technical description

Complete the assistant's console bot from the homework 1 and add error processing using the `input_error` decorator.

## Task #2

### Technical Description

Continue to develop the virtual assistant with a CLI interface. Develop a system to manage the address book.

#### Entities:

* `Field`: A base class for record fields.
* `Name`: A class for storing a contact name. Required field.
* `Phone`: A class for storing a phone number. Has format validation (10 digits).
* `Record`: A class for storing information about a contact, including name and contacts list.
* `AddressBook`: A class for storing and managing records.

#### Functionality:

1. `AddressBook`:
    * Adding records.
    * Search for records by name.
    * Delete records by name.
2. `Record`:
    * Adding phone numbers.
    * Deleting phone numbers.
    * Editing phone numbers.
    * Search for a phone number.

### Assessment Criteria

1. The class `AddressBook`:
    * A method `add_record` adding a record to `self.data` has been implemented.
    * A `find` method for finding a record by name has been implemented.
    * A `delete` method deleting a record by name has been implemented.
2. The class `Record`:
    * The `Name` object is stored in a separate attribute.
    * The list of `Phone` objects is stored in a separate attribute.
    * The methods for adding — `add_phone`, deleting — `remove_phone`, editing — `edit_phone`, and searching for Phone objects — `find_phone` have been implemented.
3. The class `Phone`:
    * The phone number validation has been implemented (must be `10` digits).


# Homework for Lesson 12 - Serialization and copying of objects
---

A virtual assistant with a command line interface (CLI)

## General acceptance criteria

* The repository `goitneo-python-hw-3-group-name` has been created.
* The homework contains a link to the GitHub repository and an attached repository file in `zip` format.
* The tasks are completed strictly per the technical description (recommendations for completion and grading criteria).
* The console has no errors or warnings when running the bot.
* The names of variables and functions are clear and descriptive.
* The code is formatted and complies with the PEP8 standard.

## Task #1

### Technical description:

Continue to develop the virtual assistant with a CLI interface from the homework 2 and combine it with the birthdays processing from the homework 1.

* Add a field for birthday - the `Birthday` class. This field is optional, but there can be only one.
* Let's add the functionality of working with `Birthday` to the `Record` class, particularly the `add_birthday` function, which adds a birthday to a contact.
* Let's add the checking functionality to correct the entered values for the `Phone` and `Birthday` fields.
* Let's add our function to the `AddressBook` class from the first homework assignment. This function is the `get_birthdays_per_week`, which returns a list of users who must be congratulated for the contacts in the address book the following week.

To implement the new functionality, also add handlers with the following commands:

* `add-birthday` — add a birthday to the contact in the format `DD.MM.YYYY`.
* `show-birthday` — show the contact's birthday.
* `birthdays` — returns a list of users who need to be congratulated on days in the next week

So, our bot should support the following list of commands:

1. `add` `[name]` `[phone]`: Add a new contact with a name and phone number.
2. `change` `[name]` `[new phone]`: Change the phone number for the specified contact.
3. `phone` `[name]`: Show the phone number for the specified contact.
4. `all`: Show all contacts in the address book.
5. `add-birthday` `[name]` [birth date]: Add a date of birth for the specified contact.
6. `show-birthday` `[name]`: Show the date of birth for the specified contact.
7. `birthdays`: Show birthdays that will take place within the next week.
8. `hello`: Receive a greeting from a bot.
9. `close` or `exit`: Close the app.

### Evaluation criteria:

1. Implement all the specified commands to the bot.
2. All data should be output in a clear and user-friendly format.
3. All errors, such as incorrect input or missing contact, should be adequately handled with an appropriate message to the user.
4. Data validation:
    * The date of birth should be in the format `DD.MM.YYYY`.
    * The phone number must consist of `10` digits.
5. The program should be closed correctly after executing the `close` or `exit` commands.

## Task 2

### Technical description:

Add the functionality of saving the address book to disk and restoring it from disk. To do this, you can choose any data serialization/deserialization protocol that suits you and implement methods that will allow you to save all data to a file and load it from a file. The main goal is to ensure that the application does not lose data after exiting the application and restores it from the file when it starts.
