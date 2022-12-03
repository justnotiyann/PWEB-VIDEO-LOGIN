const router = require("express").Router();
const controller = require("../controller/usersController");

router.post("/signin", controller.signIn);
router.post("/signup", controller.signUp);

module.exports = router;
