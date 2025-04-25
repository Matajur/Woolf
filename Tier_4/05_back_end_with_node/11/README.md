# Tier 4. Module 5 - Fullstack. Back End Development: Node.js

## Homework for Topic 11 - Websockets

### Technical task

Create a branch `hw06-email` from the `master` branch. Continue to create a REST API for working with the contact collection. Add user email verification after registration using the [ukr.net](https://ukr.net/) service and the Nodemailer package.

**How the verification process should work**

1. After registration, the user should receive an email to the email address specified during registration with a link to verify their email.
2. After following the link in the received email for the first time, the user should receive a [Response with status 200](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-06/#verification-success-response), which will mean successful email verification.
3. After following the link again, the user should receive an [Error with status 404](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-06/#verification-user-not-found).

#### Step 1

Preparing to integrate with the [ukr.net](http://ukr.net/) API.

Read the detailed instructions by clicking on the [link](https://www.edu.goit.global/uk/learn/13571785/17713435/17713705/training?blockId=25866702).

#### Step 2

**Creating an Endpoint for Email Verification**

1. Add two fields to the `User` model: `verificationToken` and `verify`. A value of `verify` equals `false`, meaning that the user's email has not yet been verified.

```JS
{
  verify: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataType.STRING,
  },
}
```

2. Create an endpoint GET `/auth/verify/:verificationToken`(# verification-request), where we will search for the user in the `User` model using the `verificationToken` parameter

- If the user with such a token is not found, it is necessary to return the ['Not Found' Error](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-06/#verification-user-not-found).
- If the user is found, set the `verificationToken` to `null`, and set the `verify` field to `true` in the user document and return a [Successful response](https://textbook.edu.goit.global/lms-nodejs-homework/v1/uk/docs/hw-06/#verification-success-response).

**Verification request**

```JS
GET /auth/verify/:verificationToken
```

**Verification user Not Found**

```JS
Status: 404 Not Found
ResponseBody: {
  message: 'User not found'
}
```

**Verification success response**

```JS
Status: 200 OK
ResponseBody: {
  message: 'Verification successful',
}
```

#### Step 3

**Adding sending an email to the user with a verification link**

When creating a user during registration:

- Create a `verificationToken` for the user and write it to the database (use the [uuid](https://www.npmjs.com/package/uuid) or [nanoid](https://www.npmjs.com/package/nanoid) package to generate the token)
- Send an email to the user's email and specify the link for verifying the email (`/auth/verify/:verificationToken`) in the message
  It is also necessary to take into account that now the user's login is not allowed if the email is not verified.

#### Step 4

**Adding resending of email to user with verification link**

It is necessary to foresee the option that the user may accidentally delete the letter. It may not reach the recipient for some reason. Our service for sending letters gave an error during registration, etc.

**POST /auth/verify**

- Receives `body` in `{email}` format.
- If there is no required `email` field in `body`, returns json with key `{"message":"missing required field email"}` and status `400`.
- If everything is fine with `body`, resend the letter with `verificationToken` to the specified email, but only if the user is not verified.
- If the user has already passed verification, send json with key `{"message":"Verification has already been passed"}` with status `400 Bad Request`.

**Resending an email request**

```JS
POST /auth/verify
Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}
```

**Resending an email validation error**

```JS
Status: 400 Bad Request
Content-Type: application/json
ResponseBody:  {
  "message": "Помилка від Joi або іншої бібліотеки валідації"
}
```

**Resending an email success response**

```JS
Status: 200 Ok
Content-Type: application/json
ResponseBody: {
  "message": "Verification email sent"
}
```

**Resend email for verified user**

```JS
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: {
  message: "Verification has already been passed"
}
```

### Acceptance criteria

- Repository with homework created
- Link to repository sent to mentor for review
- Code meets project specifications
- There are no commented code sections in the code
- Project works correctly with current LTS version of Node
