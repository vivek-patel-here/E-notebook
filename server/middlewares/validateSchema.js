const { validationResult } = require("express-validator");

const validateSchema = (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length) {
    return res.status(400).json({
      message: errors[0].msg,
      success: false,
    });
  }
  next();
};

module.exports = { validateSchema };
