const express = require("express");
const router = express.Router();
const asyncHandeler = require("../middleware/asyncHandeler.middleware");
const userController = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validation = require("../validations/index");
const UserValidation = require("../validations/user.validation");

router.post(
  "/admin/create-user",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  validation.validate(UserValidation.createUser),
  asyncHandeler(userController.createUser)
);

router.get(
  "/user/profile",
  authMiddleware.verifyToken,
  asyncHandeler(userController.getProfile)
);

router.get(
  "/user/all",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  asyncHandeler(userController.getAllUserByAdmin)
);

module.exports = router;
