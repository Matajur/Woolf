# Tier 2. Module 1: Computer Systems and Their Fundamentals

## Topic 6 - Working with NoSQL and MongoDB
## Homework

### Task

Develop a Python script that uses the PyMongo library to implement basic CRUD (Create, Read, Update, Delete) operations in MongoDB.

### Instructions

1. Create the database as required.

__Requirements for the structure of the document__

Each document in your database should have the following structure:

`{                                                                            `
` "_id": ObjectId("60d24b783733b1ae668d4a77"),                                `
` "name": "barsik",                                                           `
` "age": 3,                                                                   `
` "features": ["walks in slippers", "allows himself to be stroked", "redhead"]`
`}                                                                            `

The document presents information about the cat, its `name`, `age` and `features`.

2. Develop a Python script `main.py` to perform the following tasks.

#### Tasks to be performed:

**Read**

* Implement a function to retrieve all records from a collection.
* Implement a function that allows the user to enter a cat's name and displays information about that cat.

**Update**

* Create a function that allows the user to update the age of a cat by name.
* Create a function that allows you to add a new characteristic to the list of `features` of a cat by name.

**Delete**

* Implement a function to remove an entry from the collection by the name of the animal.
* Implement a function to remove all records from a collection.

### Recommendations for implementation:

- Use MongoDB Atlas or a locally installed MongoDB instance using Docker.
- Install the PyMongo library via `pip` or another package manager like `pipenv` or `poetry`.
- Don't forget to handle possible exceptions when performing database operations.
- Make sure your functions are well commented and well structured.
- The use of Python virtual environment is encouraged to isolate project dependencies.

### Acceptance criteria

1. A database has been created and requirements regarding the structure of documents have been met.
2. All necessary operations have been implemented.
3. Handled possible exceptions when performing database operations.
4. Functions are clearly commented and well structured.


#### Hint

Run the console script
`docker run -d -p 27017:27017 --name yourdbname -e MONGO_INITDB_ROOT_USERNAME=yourusername -e MONGO_INITDB_ROOT_PASSWORD=yourpassword mongo`
to install a MongoDB instance locally using Docker
