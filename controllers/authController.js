// Wrap each function in an individual export

///Sends the signup view to user
///Express will automatically look in the views directory and show what is inside. So "signup" for the render means express will look for a signup file inside the views directory. In this case it is an EJS file
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

////Sends the login view to user
module.exports.login_get = (req, res) => {
  res.render("login");
};

//////Receives HTTP POST request from client to sign up, sends to database
module.exports.signup_post = (req, res) => {
  res.send("New signup");
};

//////Receives HTTP POST request from client to login
module.exports.login_post = (req, res) => {
  res.send("Logged in");
};
