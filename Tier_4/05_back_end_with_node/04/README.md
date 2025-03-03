# Tier 4. Module 5 - Fullstack. Back End Development: Node.js
## Homework for Topic 4 - REST API

### Technical task

Write a REST API to work with a collection of contacts. To work with the REST API, use [Postman](https://www.getpostman.com/).

#### Step 1

Create a repository named `goit-node-rest-api` and place the files from the [src](https://github.com/goitacademy/neo-nodejs-homework/tree/main/hw2) folder on the main branch (`main`). Note: the `src` folder should not be in the repository, you are only interested in its contents.

Create a `hw02-express` branch from the `main` branch.

Install the modules with the command

```bash
npm i
```

#### Step 2

In the `contactsServices.js` file (located in the `services` folder), copy the functions from the `contacts.js` file from the homework for module 1.

#### Step 3

Write the controllers in the `contactsControllers.js` file (located in the `controllers` folder) taking into account the following requirements.

The REST API must support the following routes.

##### @ GET /api/contacts

- Calls the `listContacts` service function to work with the `contacts.json` json file

- Returns an array of all contacts in json format with a `200` status

##### @ GET /api/contacts/:id

- Calls the `getContactById` service function to work with the `contacts.json` json file

- If the contact by `id` is found, returns the contact object in json format with a `200` status

- If the contact by `id` is not found, returns json in the `{"message": "Not found"}` format with a `404` status

##### @ DELETE /api/contacts/:id

- Calls the `removeContact` service function to work with the `contacts.json` json file

- If the contact by `id` is found and deleted, returns the deleted contact object in json format with status `200`
- If the contact by `id` is not found, returns json format `{"message": "Not found"}` with status `404`

##### @ POST /api/contacts

- Gets `body` in json format with fields `{name, email, phone}`. All fields are required - for validation, create a schema in the `contactsSchemas.js` file (located in the `schemas` folder) using the `joi` package
- If there are no required fields in `body` (or the passed fields have an invalid value), returns json in the `{"message": error.message}` format (where `error.message` is a meaningful message with the essence of the error) with status `400`
- If `body` is valid, calls the `addContact` service function to work with the `contacts.json` json file, passing it data from `body`
- As a result of the function, returns a newly created object with the `{id, name, email, phone}` fields and the `201` status

##### @ PUT /api/contacts/:id

- Gets `body` in json format with any set of updated fields (`name`, `email`, `phone`) (it is not necessary to require all fields in the body as mandatory: if any of the fields is not passed, it must be saved in the contact with the value that was before the update)
- If the update request is made without passing at least one field in the `body`, returns json of the `{"message": "Body must have at least one field"}` format with the `400` status.
- The fields passed in the body must be validated - for validation, create a schema in the `contactsSchemas.js` file (located in the `schemas` folder) using the `joi` package. If the passed fields have an invalid value, returns json of the format `{"message": error.message}` (where `error.message` is a meaningful message with the essence of the error) with status `400`
- If everything is fine with `body`, calls the `updateContact` service function, which should be created in the `contactsServices.js` file (located in the `services` folder). This function should accept the `id` of the contact to be updated and data from `body`, and update the contact in the json file `contacts.json`
- As a result of the function, returns the updated contact object with status `200`.
- If the contact by `id` is not found, returns json of format `{"message": "Not found"}` with status `404`

##### Please note

- Validation of `body` can be performed either in the controller or by creating a separate middleware for these purposes, which will be called by the controller. To create a middleware, you can use the `validateBody.js` function, which you will find in the `helpers` folder
- To work with errors, you can use the `HttpError.js` function, which you will find in the `helpers` folder

If you will not use the specified functions, remove them from the project before sending the work to the mentor for review

### Acceptance criteria

- A repository with homework has been created
- A link to the repository (branch with homework) has been sent to the mentor for review
- The code complies with the technical specifications (in particular, the requirements regarding the `body` structure, content and status of responses to requests, etc. must be strictly observed)
- There are no commented sections of the code in the code
- The project works correctly with the current LTS version of Node
