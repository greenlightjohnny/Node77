///User model

const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
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

////Fire a mongoose hook/function before the user is saved to the d
//No arrow function because using the this keyword to refer to the instance of the User object, arrow function would not have this value available
//pre means before it is saved to the database
//Here we will use it for hashing a password before it is saved to the database.
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Mongoose hook, function that fires after something else happens\
//below fires a whenever a new doc is saved to the MongoDB database
//The function has the doc that was saved, and a next signal that tells it to go to the next middleware
//If the next argument is not called, it won't move on, and the response won't be sent to the server.
userSchema.post("save", function (doc, next) {
  console.log("new user created and saved", doc);

  //Must call this method at the end of any mongoose middleware/hook, or it will never move on.
  next();
});

//Static method to login the user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("Incorrect email");
};

//Create the model. Important to use the singular of what your database is named, so our data base is "users" so we name the model "user". Mongoose will look at this, pluralize it, and connect automatically to your MongoDB database
const User = mongoose.model("user", userSchema);

//exports your model, for use with controller functions to work with the data.
module.exports = User;
