
const cloudinary = require('../config/cloudinary.config');
const httpStatusCode = require('../utils/httpStatusCode');

class Validation {
  static  validate(schema) {
    return async(req, res, next) => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        if(req.file){
            try {
                await cloudinary.uploader.destroy(req.file.filename)
            } catch (error) {
                throw error
                
            }
        }
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          errors: error.details.map((err) => ({
            field: err.path.join(","),
            message: err.message,
          })),
        });
      }
      req.body = value;
      next();
    };
  }
}
module.exports = Validation;
