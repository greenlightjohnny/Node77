// Wrap each function in an individual export

////// Import the User model
const User = require("../models/User");

///Sends the signup view to user
///Express will automatically look in the views directory and show what is inside. So "signup" for the render means express will look for a signup file inside the views directory. In this case it is an EJS file
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

////Sends the login view to user
module.exports.login_get = (req, res) => {
  res.render("Login");
};

//////Receives HTTP POST request from client to sign up, sends to database. Async so that it can take the time it needs to connect to the MongoDB database.
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  ///try catch block attempting to create a new user, using the User model and the data from the POST request
  try {
    ///creating the user, awaits the response before saving to user.
    const user = await User.create({ email, password });
    ///If it works, returns a 201 status along with some JSON of the user object to the client.
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("error, user creation failed");
  }
};

//////Receives HTTP POST request from client to login
module.exports.login_post = async (req, res) => {
  //destructuring the req, parsed already into a JavaScript object by using middleware in the app.js file, express.json(). Here we take the user name and password from the body object
  const { email, password } = req.body;

  res.send(testMe);
};
