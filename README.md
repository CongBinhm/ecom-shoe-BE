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
    - requset:
      - method: GET
      - url: "/products"
    - reponse: 
      - success: { 
        - data: { 
            "total_items": Number,
            "current_page": Number,
            "per_page": Number,
            "total_pages": Number
          } 
      }    

