# Tier 4. Module 5 - Fullstack. Back End Development: Node.js

## Homework for Topic 2 - Development of console applications
### Technical task

#### Step 1

- Create a repository named `goit-node-cli`, clone and initialize the project in it using the npm init command. Install the [commander](https://www.npmjs.com/package/commander) package as a dependency of the project
- Place the files from the [src](https://github.com/goitacademy/neo-nodejs-homework/tree/main/hw1) folder in the root of the project

#### Step 2

- In the `contacts.js` file, import the `fs` modules (in the version that works with promises - `fs/promises`) and `path` to work with the file system.
- Create a `contactsPath` variable and write the path to the `contacts.json` file in it. To build the path, use the `path` module methods.
- Add asynchronous functions to work with the contact collection. In the functions, use the `fs` module and its `readFile()` and `writeFile()` methods. The corresponding functions should return the necessary data using the return operator. Output to the console in the written functions should not be performed.
- Export the created functions.

```js
// contacts.js

/*
* Uncomment and write down the value
* const contactsPath = ;
*/

async function listContacts() {
// ...your code. Returns an array of contacts.
}

async function getContactById(contactId) {
// ...your code. Returns a contact object with this id. Returns null if a contact with this id is not found.
}

async function removeContact(contactId) {
// ...your code. Returns a removed contact object. Returns null if a contact with this id is not found.
}

async function addContact(name, email, phone) {
// ...your code. Returns an added contact object (with id).
}
```

#### Step 3

Import the functions from the `contacts.js` file into the `index.js` file.

Next, use the ready-made `invokeAction()` function, which receives the type of the action to be performed and the necessary arguments. The function should call the corresponding method from the `contacts.js` file, passing it the necessary arguments. The result of the called function should be displayed in the console.

#### Step 4

Run the commands in the terminal and make sure that the code works properly.

```shell
# Get and display the entire list of contacts in the form of a table (console.table)
node index.js -a list

# Get the contact by id and display the contact object in the console or null if the contact with such id does not exist.
node index.js -a get -i 05olLMgyVQdWRwgKfg5J6

# Add a contact and output the newly created contact object to the console
node index.js -a add -n Mango -e mango@gmail.com -p 322-22-22

# Delete a contact and output the deleted contact object to the console or null if there is no contact with such an id.
node index.js -a remove -i qdggE76Jtbfd9eWJHrssH
```

### Acceptance criteria

- A repository with homework has been created
- A link to the repository has been sent to the mentor for review
- The code complies with the project's technical specifications
- There are no commented code sections in the code
- The project works correctly with the current LTS version of Node
