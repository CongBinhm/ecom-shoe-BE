# Ecommerce shoe server

## Available Scripts

### Add package

#### `npm install` or `yarn add`

### Run project

#### `npm start` or `yarn start`

Runs the server in the development mode.
Server run on http://localhost:4000

## API description

- Public API:
  - Get products list:
    - request:
      - method: GET
      - url: "v1/products"
    - response:
      - success: {
        - data: {
          "items": [
          {
          product
          }
          ]
          "total_items": Number,
          "current_page": Number,
          "per_page": Number,
          "total_pages": Number
          }
          }
  - Get product:
    - request:
      - method: GET
      - url: "v1/product/:id"
    - response: {
      data:{product}
      }
- User API
  - Login:
    - request:
      - method: POST
      - url: "/v1/users/current/login"
      - body: {
        "email": "admin@gmail.com",
        "password": "Ledangquang109"
        }
      - response: {data: {token: "string"}}
