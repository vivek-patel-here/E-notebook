const { User } = require("../models/user.js");
const bcrypt = require("bcrypt");


const signupLogic = async (req, res) => {
  const { username, email, password } = req.body;
  let registerdUser = await User.findOne({ email });
  if (registerdUser) {
    return res.status(409).json({
      message:
        "An account with this email already exists. Please log in or use a different email.",
      success: false,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  let newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  console.log(newUser);
  res.status(200).json({
    message: "Sign-up completed successfully.",
    success: true,
  });
};

module.exports = { signupLogic };
