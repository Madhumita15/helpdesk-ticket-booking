const Joi = require("joi");

class UserValidation {
  static createUser = Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().trim().email().required().messages({
      "string.email": "Please enter valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    role: Joi.string().valid("customer", "agent").required().messages({
      "string.empty": "Role is required",
      "any.only": "Role must be customer or agent",
      "any.required": "Role is required",
    }),
    password: Joi.string().trim().min(6).optional().messages({
      "string.min": "Password must be at least 6 characters",
    }),
  });

  static login = Joi.object({
    email: Joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    password: Joi.string().trim().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  });
}

module.exports = UserValidation;
