# Authentication using JSON Web Tokens (JWTs)

## Topics
- **enpoint api**
- # users router endpoint
 - /api/register  **register endpoint for users**
 user schema example:
 {
   "name": "Robbin William",
   "username: "Robin",
   "password": "rob003",
   "email": "Robbin@robbin.com",
 }
- /api/login **login endpoint for users**
user login example: ## password will return the token into client side.
{
  "username": "Robin",
  "password": "rob003",
}


