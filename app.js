const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
//Get your routes here! 50% off sale, cheap!
const authRoutes = require("./routes/authRoutes.js");

// middleware
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.DB_PASS;
console.log(dbURI);
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

////Middleware, this one takes any JSON data sent along with requests and parses it into a JavaScript object. So, a login with an email and password would arrive as JSON and need to be parsed before it can be read properly by any functions the data might be going to. Attaches it to the req object.
app.use(express.json());

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
///Tells the app what to do when certain routes are hit.
app.use(authRoutes);
