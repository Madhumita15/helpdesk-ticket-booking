const User = require("../models/user.model");
const generateRandomPassword = require("../utils/generateRandomPassword");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../utils/generateToken");
const httpStatusCode = require("../utils/httpStatusCode");
const SendEmail = require("../utils/sendMail");

const createUserService = async ({ name, email, role, password }) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    const error = new Error("User already exist");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const finalPassword = password || generateRandomPassword();

  const newUser = new User({
    name: name,
    email: email,
    password: password,
    role: role,
  });

  const user = await newUser.save();
  try {
    await SendEmail.sendEmailCredentials(user, finalPassword);
  } catch (mailErr) {
    console.error("Failed to send credentials email:", mailErr.message);
  }
  return user;
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error(
      "Your account is blocked by the admin, contact administrator",
    );
    error.statusCode = httpStatusCode.FORBIDDEN;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  const refreshToken = generateRefreshToken(user);
  const accessToken = generateAccessToken(user);
  user.refreshToken = refreshToken;
  await user.save();
  return { user, refreshToken, accessToken };
};

const logoutService = async ({ userId, refreshToken }) => {
  if (!refreshToken) {
    const error = new Error("RefreshToken not found");
    error.statusCode = httpStatusCode.UNAUTHORIZED;
    throw error;
  }
  const findUser = await User.findById(userId);
  if (!findUser) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  if (findUser.refreshToken !== refreshToken) {
    const error = new Error("refreshtoken does not match");
    error.statusCode = httpStatusCode.UNAUTHORIZED;
    throw error;
  }
  findUser.refreshToken = null;
  await findUser.save();
  return findUser;
};

const getProfileService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }
  return user;
};

const getAllUsersByAdminService = async () => {
  const users = await User.find({
    role: { $ne: "admin" },
  }).select("-refreshToken -password");
  return users;
};

module.exports = {
  loginService,
  createUserService,
  logoutService,
  getProfileService,
  getAllUsersByAdminService,
};
