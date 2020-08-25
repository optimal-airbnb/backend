# Authentication using JSON Web Tokens (JWTs)

## Topics

- **Api Endpoints**

---

## List of Endpoints

### Base URL

https://buildweekairbnb.herokuapp.com

| Method | Endpoint           | Description                                                                                                                                                    |
| ------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/auth/register | Creates a User using the Information sent Inside the Body of the request.                                                                                      |
| POST   | /api/auth/login    | Uses the credentials sent inside the body to authenticate the user.                                                                                            |
| GET    | /api/users         | If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in respond with the correct status code. |
| DELETE | /api/users/:id     | Deletes an existing user by reading the ID of the user in the database.                                                                                        |

**Register Endpoint For Users**

- name
- username (unique)
- password
- email (unique)

## Data Schema:

```js
   {
     "name": "name",
     "username": "username",
     "password": "password",
     "email": "email@email.com",
   }
```

## Test Accounts

```js
   {
     "name": "admin",
     "username": "admin",
     "password": "password",
     "email": "admin@admin.com",
   }
```

**Login Endpoint For Users**

user login example: ## password will return the token into client side.

## Data Schema:

```js
   {
     "username": "username",
     "password": "Password",
   }
```

### Test Accounts:

```js
   {
     "username": "username",
     "password": "Password",
   }
```

# Property endpoint

## data Schema:

```js
{
  "name": "propertyname", // required
  "user_id": "users.id", //  complerment the user Id, required
  "description": "property description", // required
  "type": "property type" // any type of property like entier home, private room etc.
  "location": "New York City",
  "bedroom" : 4,
  "bathroom": 2.5
}
