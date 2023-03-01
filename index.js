require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routers = require("./routers");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = require("./swagger.json");

const port = process.env.PORT || 4000;
const database = process.env.DATABASE_URL;
const app = express();
const version = "/v1";
const options = {
  swaggerDefinition,
  apis: ["./routers/index.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(version, routers);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.set("strictQuery", false); // hide notify in console
mongoose
  .connect(database)
  .then((result) => {
    console.log(`connect database with url: ${database}`);
    app.listen(port, () => {
      console.log(`start server at port: ${port}`);
    });
  })
  .catch((err) => console.log(err));
