const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
require("dotenv").config();
const app = express();
//Get your routes here! 50% off sale, cheap!
const authRoutes = require("./routes/authRoutes.js");

// middleware
app.use(express.static("public"));
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.DB_PASS;

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
app.get("*", checkUser); // uses check user to check.
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
///Tells the app what to do when certain routes are hit.
app.use(authRoutes);
if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  //app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "home.ejs"));
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server on ${port}`));
const hi = "3eeee";

// //Cookies
// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=true");

//   // cookie is made available on the res by cookie-parser. Cookies are set to session for maxAge by default, will close with browser window
//   //Third item is an object for options
//   // secure: true means the cookie will only be sent over HTTPS, not if HTTP
//   //httpOnly: true, means cookie can't be accessed from the front end, only via HTTP
//   res.cookie("newUser", false);
//   res.cookie("employee", true, { maxAge: 1000 * 60 * 60 * 24 });
//   res.send("You got the cookie!");
// });

// app.get("/read-cookies", (req, res) => {
//   //server reads cookies sent from client
//   const cookies = req.cookies;
//   console.log(cookies.newUser);
//   res.json(cookies);
// });
