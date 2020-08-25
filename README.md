# Authentication using JSON Web Tokens (JWTs)

## Topics

- **enpoint api**
- # users router endpoint

**register endpoint for users**

- name
- username (unique)
- password
- email (unique)

## /api/register

## Data Schema:

```js
   {
     "name": "Robbin William",
     "username": "Robin",
     "password": "rob003",
     "email": "robbin@robbin.com",
   }
```

**login endpoint for users**

## /api/login

user login example: ## password will return the token into client side.

## Data Schema:

```js
   {
     "username": "Robin",
     "password": "rob003",
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
