////Express auth routes, what functions each route should perform.
const { Router } = require("express");

///Init new router object, can save as any name you want, but router is most common.
const router = Router();

router.get("./signup", () => {});
router.post("./signup", () => {});
router.get("./login", () => {});
router.post("./login", () => {});

module.exports = router;
