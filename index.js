require("dotenv").config();
const { request } = require("express");
const express = require("express"); //express er serveren
const formidable = require("express-formidable");
const cors = require("cors")
const animals = require("./routes/animals");
const foods = require("./routes/foods");
const accessories = require("./routes/accessories");

//set up express app
const app = express();

//import db-database
require("./database");

app.use("/", express.static('docs'))

//allows request from other origins
app.use(cors())

//parse http form data
app.use(formidable());

//set up app routes
app.use("/api/v1", animals)
app.use("/api/v1", foods)
app.use("/api/v1", accessories)

app.listen(process.env.PORT || 4000, function(){
    console.log("now listening for request on port 4000");
}) 