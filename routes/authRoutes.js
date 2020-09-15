////Express auth routes, what functions each route should perform.

//// Destructuring the Router object from the express NPM package
const { Router } = require("express");

///// Get the controller object,  which exports a bunch of different functions
const authController = require("../controllers/authController");

///Init new router object, can save as any name you want, but router is most common.
const router = Router();

///When a route is hit, uses the the authController object to access a function for that route and do something cool
router.get("/signup/", authController.signup_get);
router.post("/signup/", authController.signup_post);
router.get("/login/", authController.login_get);
router.post("/login/", authController.login_post);

module.exports = router;
