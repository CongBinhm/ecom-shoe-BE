require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routers = require("./routers");

const port = process.env.PORT || 4000;
const database = process.env.DATABASE_URL;
const app = express();
const corsOptions = {
  origin: process.env.corsOrigin,
};
const version = "/v1";

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(version, routers);

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
