let jwt = require("jsonwebtoken");
const ensureAuthenticated = (req, res, next) => {
  let auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(401)
      .json({ message: "Token not found. Access denied.", success: false });
  }
  try {
    let decodedData = jwt.verify(auth, process.env.JWT_SECRET);
    req.user=decodedData;
    next()
  } catch (err) {
    return res
      .status(401)
      .json({
        message:
          "Token is either wrong or expired. Access denied. Please login again",
        success: false,
      });
  }
};


module.exports={ensureAuthenticated}
