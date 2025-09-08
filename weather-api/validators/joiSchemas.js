const Joi = require("joi");

// 🔹 User validation schema
const userValidation = {
  register: Joi.object({
    name: Joi.string().min(5).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 5 characters long",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),
    password: Joi.string()
      .min(6)
      .pattern(/^[a-zA-Z0-9@#\$%\^\&*\)\(+=._-]+$/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base":
          "Password must contain only letters, numbers, and special characters (@, #, $, %, etc.)",
      }),
    role: Joi.string().valid("user", "admin").default("user"),
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
    }),
  }),

  updateProfile: Joi.object({
    name: Joi.string().min(5).messages({
      "string.min": "Name must be at least 5 characters long",
    }),
    email: Joi.string().email().messages({
      "string.email": "Email must be a valid email address",
    }),
    password: Joi.string()
      .min(6)
      .pattern(/^[a-zA-Z0-9@#\$%\^\&*\)\(+=._-]+$/)
      .messages({
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base":
          "Password must contain only letters, numbers, and special characters (@, #, $, %, etc.)",
      }),
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
    }),
  }),

  resetPassword: Joi.object({
    token: Joi.string().required().messages({
      "string.empty": "Token is required",
    }),
    newPassword: Joi.string()
      .min(6)
      .pattern(/^[a-zA-Z0-9@#\$%\^\&*\)\(+=._-]+$/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.base":
          "Password must contain only letters, numbers, and special characters (@, #, $, %, etc.)",
      }),
  }),
};

// 🔹 Weather validation schema
const weatherValidation = {
  create: Joi.object({
    city: Joi.string().min(3).required().messages({
      "string.empty": "City is required",
      "string.min": "City must be at least 3 characters long",
    }),
    temperature: Joi.number().min(-50).max(60).required().messages({
      "number.base": "Temperature must be a number",
      "number.min": "Temperature cannot be below -50",
      "number.max": "Temperature cannot be above 60",
    }),
    condition: Joi.string()
      .valid("Sunny", "Rainy", "Cloudy", "Snowy")
      .required()
      .messages({
        "any.only":
          "Condition must be one of Sunny, Rainy, Cloudy, or Snowy",
      }),
  }),
};

module.exports = { userValidation, weatherValidation };
