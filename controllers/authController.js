// Wrap each function in an individual export

///Sends the signup view to user
module.exports.signup_get = (req, rs) => {
  res.render("signup");
};

////Sends the login view to user
module.exports.login_get = (req, rs) => {
  res.render("login");
};

//////Receives HTTP POST request from client to sign up, sends to database
module.exports.signup_post = (req, rs) => {
  res.send("New signup");
};

//////Receives HTTP POST request from client to login
module.exports.login_post = (req, rs) => {
  res.send("Logged in");
};
