# Tier 4. Module 5 - Fullstack. Back End Development: Node.js

## Homework for Topic 7 - Authentication and authorization

### Technical task

Create a branch `04-auth` from the `master` branch. Continue creating the REST API to work with the contact collection. Add the user authentication/authorization logic via [JWT](https://jwt.io/).

#### Step 1

1. In code, create a user model for the `users` table.

```JS
{
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  subscription: {
      type: DataTypes.ENUM,
      values: ["starter", "pro", "business"],
      defaultValue: "starter"
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
}
```

2. Change the contact model so that each user can see only their own contacts. To do this, add a property to the contact model.

```JS
owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
```

#### Step 2

**Registration**

1. Create an endpoint `/auth/register`
2. Validate all required fields (email and password). If validation fails, return [Validation Error](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#registration-validation-error).

If validation is successful, create a user in the User model based on the validated data. Use [bcrypt](https://www.npmjs.com/package/bcrypt) or [bcryptjs](https://www.npmjs.com/package/bcryptjs) to hash passwords

- If the email is already in use by someone else, return [Conflict Error](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#registration-conflict-error).
- Otherwise, return [Success Response](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#registration-success-response).

**Login**

1. Create an endpoint `/auth/login`.
2. In the `User` model, find the user by `email`.
3. Validate all required fields (email and password). If validation fails, return a [Validation Error](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#validation-error-login).

- Otherwise, compare the password for the found user, if the passwords match, create a token, save it in the current user, and return a [Successful response](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#login-success-response).
- If the password or email is incorrect, return an [Unauthorized Error](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#login-auth-error).

#### Step 3

**Token Validation**

Create a middleware to validate the token and add it to all routes that need to be protected.

- The middleware takes the token from the `Authorization` headers, validates the token for validity.
- In case of error, return an [Unauthorized Error](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#middleware-unauthorized-error).
- If validation is successful, get the user `id` from the token. Find the user in the database with this `id`.
- If the user exists and the token matches the one in the database, write their data to `req.user` and call `next()`.
- If the user with this `id` does NOT exist or the tokens do not match, return an [Unauthorized Error](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#middleware-unauthorized-error).

#### Step 4

**Logout**

1. Create an endpoint `/auth/logout`.
2. Add a token validation middleware to the route.

- In the `User` model, find the user by `id`.
- If the user does not exist, return an [Unauthorized Error](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#logout-unauthorized-error).
- Otherwise, remove the token from the current user and return a [Successful response](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#logout-success-response).

#### Step 5

**Current user - get user data by token**

1. Create endpoint `/auth/current`.
2. Add token validation middleware to route.

- If user does not exist, return [Unauthorized Error](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#current-user-unauthorized-error).
- Otherwise return [Success response](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-04/#current-user-success-response).

#### Additional task (optional)

- Create pagination for the contact collection (`GET` `/contacts?page=1&limit=20`).
- Create filter for contacts by favorite field (`GET` `/contacts?favorite=true`).
- Update user `subscription` via `PATCH` `/auth/subscription` endpoint. Subscription must have one of the following values `​​['starter', 'pro', 'business']`.

### Acceptance criteria

- Repository with homework created
- Link to repository sent to mentor for review
- Code meets project specifications
- There are no commented code sections in the code
- Project works correctly with current LTS version of Node
