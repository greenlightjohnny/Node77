// Wrap each function in an individual export

////// Import the User model
const User = require("../models/User");

///Handle errors (such as passed in from the User model) and returns a useful error
const handleErrors = (err) => {
  //Create an error object, so that it can be returned as an HTTP response to the user as a JSON object with info as to why the POST request failed.
  let errors = { email: "", password: "" };

  ///Dup error code
  if (err.code === 11000) {
    errors.email = "Try a different email";
    console.log(errors);
    return errors;
  }

  ///validation errors
  ///This message comes from the User.js file, and the validator auth NPM package returns it.
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
///Sends the signup view to user
///Express will automatically look in the views directory and show what is inside. So "signup" for the render means express will look for a signup file inside the views directory. In this case it is an EJS file
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

////Sends the login view to user
module.exports.login_get = (req, res) => {
  res.render("login");
};

//////Receives HTTP POST request from client to sign up, sends to database. Async so that it can take the time it needs to connect to the MongoDB database.Responds to the client with either a 201 message or 400 error using a try catch block.
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  ///try catch block attempting to create a new user, using the User model and the data from the POST request
  try {
    ///creating the user, awaits the response before saving to user.
    const user = await User.create({ email, password });
    ///If it works, returns a 201 status along with some JSON of the user object to the client.
    res.status(201).json(user);
  } catch (err) {
    ///Store any errors caught by the handleErrors function
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
};

//////Receives HTTP POST request from client to login
module.exports.login_post = async (req, res) => {
  //destructuring the req, parsed already into a JavaScript object by using middleware in the app.js file, express.json(). Here we take the user name and password from the body object
  const { email, password } = req.body;

  res.send(testMe);
};
