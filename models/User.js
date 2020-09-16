///User model

const mongoose = require("mongoose");
const { isEmail } = require("validator");

//Create schema, pass it an object defining the structure of it, properties.
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Email is not valid"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Must be at least 6 characters"],
  },
});

//Create the model. Important to use the singular of what your database is named, so our data base is "users" so we name the model "user". Mongoose will look at this, pluralize it, and connect automatically to your MongoDB database
const User = mongoose.model("user", userSchema);

//exports your model, for use with controller functions to work with the data.
module.exports = User;
