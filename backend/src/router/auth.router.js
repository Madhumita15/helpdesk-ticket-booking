const express = require("express");
const router = express.Router();
const asyncHandeler = require("../middleware/asyncHandeler.middleware");
const userController = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validation = require("../validations/index");
const UserValidation = require("../validations/user.validation");



router.post(
  "/login",
  validation.validate(UserValidation.login),
  asyncHandeler(userController.login),
);
router.post(
  "/logout",
  authMiddleware.verifyToken,
  asyncHandeler(userController.logout),
);

module.exports = router;
