const jwt = require("jsonwebtoken");

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      role: user.role,
      id: user._id,
    },
    process.env.JWT_REFRESH_SECRET_KEY,
    { expiresIn: "7d" },
  );
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      role: user.role,
      id: user._id,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    { expiresIn: "1d" },
  );
};

module.exports = {generateAccessToken, generateRefreshToken}
