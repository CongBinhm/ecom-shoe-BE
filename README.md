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
      - url: `v1/products`
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
    - note: id is id of product
    - request:
      - method: GET
      - url: `v1/product/:id`
    - response: {
      data:{product}
      }
- User API
  - Login:
    - request:
      - method: POST
      - url: `/v1/users/current/login`
      - body: {
        "email": String,
        "password": String
        }
      - response: {data: {token: String}}
  - Register:
    - note: if admin_key is true with key on server account will be create as admin
    - request:
      - method: POST
      - url: `/v1/users/current`
      - body: {
        "first_name": String,
        "last_name": String,
        "phone_number": String,
        "email": String,
        "password": String,
        "avatar_img": String,
        "admin_key": String
        }
  - Get user data:
    - note: require beaer token in header
    - request:
      - method: GET
      - url: `/v1/users/current`
    - response: { data: {
      "id": String,
      "email": String,
      "role": String,
      "first_name": String,
      "last_name": String,
      "phone_number": String,
      "avatar_img": String
      }}
  - Update user data:
    - note: require beaer token in header
    - request:
      - method: PUT
      - url: `/v1/users/current`
      - body: {
        "first_name": String,
        "last_name": String,
        "phone_number": String,
        "admin_key": String
        }
  - Logout:
    - note: require beaer token in header
    - request:
      - method: DELETE
      - url: `/v1/users/current/logout`
    - response: {message: "Logout success"}
  - Logout all device:
    - note: require beaer token in header
    - request:
      - method: DELETE
      - url: `/v1/users/current/logoutAll`
    - response: {message: "Logout all device success"}
  - Get user cart:
    - note: require beaer token in header
    - request:
      - method: Get
      - url: `/v1/cart`
    - response: {
      "data": {
      "id": String,
      "grand_total": Number,
      "items_total": Number,
      "discount_amount": Number,
      "products": [{
      product: {},
      size_id: String,
      quantity: Number,
      selected: Boolean,
      size: {},
      id: String
      }]
      }
      }
  - Post item cart:
    - note: require beaer token in header
    - request:
      - method: POST
      - url: `/v1/cart`
      - body: {
        "productId": String,
        "sizeId": String,
        "quantity": Number
        }
    - response: {
      "data": {
      "id": String,
      "grand_total": Number,
      "items_total": Number,
      "discount_amount": Number,
      "products": [{
      product: {},
      size_id: String,
      quantity: Number,
      selected: Boolean,
      size: {},
      id: String
      }]
      }
      }
