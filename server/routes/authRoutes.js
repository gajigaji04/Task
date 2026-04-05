const router = require("express").Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.delete("/delete", authMiddleware, authController.deleteUser);

module.exports = router;
