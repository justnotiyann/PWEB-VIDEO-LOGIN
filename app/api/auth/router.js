const router = require("express").Router();
const controller = require("./authController");

// render
router.get("/signin", controller.renderSignIn);
router.get("/signup", controller.renderSignUp);

// logic signin dan signup
router.post("/signin", controller.signIn);
router.post("/signup", controller.signUp);

// logic reset password

module.exports = router;
