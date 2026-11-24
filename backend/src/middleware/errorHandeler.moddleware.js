const httpStatusCode = require("../utils/httpStatusCode");
const cloudinary = require("../config/cloudinary.config");


const errorHandelere = async (err, req, res, next) => {
  const statusCode = err.statusCode || httpStatusCode.SERVER_ERROR;
  if (req.file) {
    try {
      await cloudinary.uploader.destroy(req.file.filename);
    } catch (error) {
      logger.info("error coming from cloudinary", error);
    }
  }
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandelere;
