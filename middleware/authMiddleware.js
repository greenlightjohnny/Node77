const jwt = require("jsonwebtoken");

//Creating middleware, gets req, res, and next.
const requireAuth = (req, res, next) => {
  //Use cookie parser to grab the cookie you want, named jwt by us, but could be called anything
  const token = req.cookies.jwt;

  //check to see if the cookie exists
  if (token) {
    //use the verify method. Takes in the token secret, and a function. The function takes in any errors, and the decoded token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      ///If error, send to login page
      if (err) {
        console.log("midware", err.message);
        res.redirect("/login");
      } else {
        //token present, no errors, call next() so the middleware moves on, will now show the protected route
        console.log("midd", decodedToken);
        next();
      }
    });
  }
  ////if not cookie, redirects to the login page
  else {
    res.redirect("/login");
  }
};
