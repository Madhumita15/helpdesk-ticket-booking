const Joi = require("joi");

class TicketValidation {
  static createTicket = Joi.object({
    title: Joi.string().trim().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
    description: Joi.string().trim().required().messages({
      "string.empty": "Description is required",
      "any.required": "Description is required",
    }),
    priority: Joi.string()
      .valid("low", "medium", "high", "urgent")
      .required()
      .messages({
        "string.empty": "Priority is required",
        "any.only": "Priority must be one of low, medium, high, urgent",
        "any.required": "Priority is required",
      }),
    customer: Joi.string().optional().allow("", null),
  });

  static updateTicket = Joi.object({
    title: Joi.string().trim().optional().messages({
      "string.empty": "Title cannot be empty",
    }),
    description: Joi.string().trim().optional().messages({
      "string.empty": "Description cannot be empty",
    }),
    priority: Joi.string()
      .valid("low", "medium", "high", "urgent")
      .optional()
      .messages({
        "any.only": "Priority must be one of low, medium, high, urgent",
      }),
  });

  static updatePriority = Joi.object({
    priority: Joi.string()
      .valid("low", "medium", "high", "urgent")
      .required()
      .messages({
        "any.only": "Priority must be one of low, medium, high, urgent",
        "any.required": "Priority is required",
      }),
  });
}

module.exports = TicketValidation;
