const crypto = require("crypto");

const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString("hex");
};

module.exports = generateRandomPassword;
