const router = require("express").Router();
const middleware = require("../../middleware/checkRole");

router.get("/", middleware.checkSession, (req, res) => {
  res.send("oke");
});

module.exports = router;
