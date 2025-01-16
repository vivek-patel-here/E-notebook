const jwt = require("jsonwebtoken");
const { User } = require("../models/user.js");
const bcrypt = require("bcrypt");


const loginLogic = async (req, res) => {
    const { email, password } = req.body;
    const registerdUser = await User.findOne({ email });
    if (!registerdUser) {
      return res.status(404).json({
        message: "No account found with this email. Please sign up to continue.",
        success: false,
      });
    }
  
    const istruePassword = await bcrypt.compare(password, registerdUser.password);
    if (!istruePassword) {
      return res.status(401).json({
        message: "Email or password is wrong!",
        success: false,
      });
    }
  
    const token = jwt.sign(
      {name :registerdUser.username, email: registerdUser.email, id: registerdUser._id },
      process.env.JWT_SECRET,{
        expiresIn:'24h'
      }
    );
    return res.status(200).json({
      message: "Login successful.",
      success: true,
      email: registerdUser.email,
      username: registerdUser.username,
      id: registerdUser._id ,
      token,
    });
  }

module.exports={loginLogic}