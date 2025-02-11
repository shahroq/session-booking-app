const express = require("express");

const userController = require("../controllers/user");
const { signupValidation, signinValidation } = require("../validators/user");

const router = express.Router();

// defining auth routes
router.put("/signup", signupValidation, userController.signup);
router.post("/signin", signinValidation, userController.signin);

module.exports = router;
