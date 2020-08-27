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
     "name": "name", // required
     "username": "username", // required
     "password": "password", // required
     "email": "email@email.com", // not required is up to client will provided or not
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
| Method | Endpoint           | Description                                                                                                                                                    |
| ------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST    | /api/properties      | Creates a properities  lists need to login before can create any property   |                                                                        |
| GET     | /api/property/:id/image  |Get property image by grab image image i d at the property                 |
| GET     | /api/properties      | If the user is logged in, respond with an array of all properties contained in the database. If the user is not logged in respond with the correct status code. |
| GET  | /api/properties/:id   | If the user is logged in,Will  Get property by propety id|
| PUT     | /api/properties/:id |If the user is logged in, User can  Update the property by property Id |
| DELETE  | api/propeties/:id | If the user is logged, the user can delete property by givend the property id
|       

**Register Endpoint For Property list**

- name (unique)
- user_id  
- description
- type
- location
- bedroom
- bathroom

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
```
### Test 

# Image Endpint 
| Method | Endpoint           | Description                                                                                                                                                    |
| ------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST    | /api/images     | Creates a properities  lists need to login before can create any property   

| POST    | /api/images/:id     | Add the image to property by grap property id and add the image to the given property Id need params to passed the id   |                                                                        |
| GET     | /api/images/:id/property  |Get property image by grab image id at the property                 |
| GET     | /api/images    | If the user is logged in, respond with an array of all properties contained in the database. If the user is not logged in respond with the correct status code. |
| GET  | /api/images/:id   | If the user is logged in,Will  repond image by image id|
| PUT     | /api/images/:id |If the user is logged in, User can  Update the image by image Id |
| DELETE  | api/images/:id | If the user is logged, the user can delete image by givend the image id
|   

**Register Endpoint to add image to property**

- property_id
- image

## data Schema:

```js
{
  "property_id": "property id" , // required 
  "image": "image url" 
}
```
## Test
```js
{
  "property_id": 1 ,
  "image": "https://images.unsplash.com/photo-1585551897142-80acdcaab4b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
}
```

# Price Predicted endpoint

| Method | Endpoint           | Description                                                                                                                                                    |
| ------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST    | /api/price    | Creates a form to send the json object to backend  need to login before can create any property   will recieved the predicted_priced back from data side api. 

## data schema

```js
{
    "Borough": "Brooklyn", // required 
    "Neighbourhood": "Kensington", // required
    "Room_type": "Private room", // required
    "Minimum_nights": 1, // required
    "Availability_365": 365 // required
}

```