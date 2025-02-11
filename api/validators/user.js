const { body } = require("express-validator");
const { User } = require("../models");

exports.signupValidation = [
  body("name").trim().not().isEmpty().withMessage("Name is mandatory"),
  body("email")
    .isEmail()
    .withMessage("Email is not valied")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        return Promise.reject("E-Mail address already exists!");
      }
    })
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("role")
    .isIn(["therapist", "client"])
    .withMessage("Role must be 'therapist' or 'client'"),
];

exports.signinValidation = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];
