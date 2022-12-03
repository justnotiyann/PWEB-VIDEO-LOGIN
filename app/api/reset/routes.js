const router = require("express").Router();
const controller = require("./resetController");

// render
router.get("/", controller.renderReset);
router.get("/:id", controller.renderResetPass);

// logic
router.post("/", controller.sendResetEmail);
router.post("/change", controller.handleResetPassword);

module.exports = router;
