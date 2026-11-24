const {
  loginService,
  createUserService,
  logoutService,
  getProfileService,
  getAllUsersByAdminService,
} = require("../service/user.service");
const httpStatusCode = require("../utils/httpStatusCode");


class UserController {
  async createUser(req, res) {
    const { email, role, name, password } = req.body;
    await createUserService({ email, role, name, password });
    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "User created and mail send to user account successfully!",
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const { user, refreshToken, accessToken } = await loginService({
      email,
      password,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Login successfully!",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  }

  async logout(req, res) {
    const userId = req.user._id;
    const { refreshToken } = req.cookies;
    await logoutService({ userId, refreshToken });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Logout successfully!",
    });
  }

  async getProfile(req, res) {
    const userId = req.user._id;
    const user = await getProfileService(userId);
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "User gets profile sucessfully",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  }

  async getAllUserByAdmin(req, res) {
    const users = await getAllUsersByAdminService();
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "users gets successfully!",
      data: users,
    });
  }
}

module.exports = new UserController();
