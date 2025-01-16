const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { validateSchema } = require("../middlewares/validateSchema.js");
const { wrapAsync } = require("../middlewares/wrapAsync.js");
const { signupLogic } = require("../controllers/signup.js");
const { loginLogic } = require("../controllers/login.js");

//Signup route
router.post(
  "/auth/signup",
  [
    body("username", "Username must be atleast 2 characters long string")
      .isString()
      .isLength({ min: 2 }),
    body("email", "Please Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 4 character long string")
      .isString()
      .isLength({ min: 4 }),
  ],
  validateSchema,
  wrapAsync(signupLogic)
);

//Login Route
router.post(
  "/auth/login",
  [
    body("email", "Please Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 4 character long string")
      .isString()
      .isLength({ min: 4 }),
  ],
  validateSchema,
  wrapAsync(loginLogic)
);

module.exports = router;
