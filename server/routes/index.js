const express = require("express");
const authController = require("../controllers/authController");
const verifyToken = require("../helpers/verifyToken.js");
const router = express.Router();

router.post("/signin", authController.signIn);
router.post("/user", verifyToken, authController.getAuthenticatedUser);
// router.post('/signup', chatController.signUp);

module.exports = router;
