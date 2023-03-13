const Joi = require("joi");

const validate = require("./validate");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "any.required": "first name is required",
    "string.empty": "first name is required",
    "string.base": "first name must be a string",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "last name is required",
  }),

  address: Joi.string().trim().required().messages({
    "string.empty": "last name is required",
  }),
  emailOrMobile: Joi.alternatives()
    .try(
      Joi.string().email({ tlds: false }),
      Joi.string().pattern(/^[0-9]{10}$/)
    )
    .messages({
      "alternatives.match": "must be valid email address or modile number",
    })
    .strip(),
  password: Joi.string().alphanum().min(6).required().trim().messages({
    "string.empty": "password is required",
    "string.alphanum": "password must be a number or alphabet",
    "string.min": "password must have at least 6 charaters",
  }),
  repassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .trim()
    .messages({
      "any.only": "password and confirm password did not match",
      "string.empty": "confirm password is required",
    })
    .strip(),
  email: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
  mobile: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().pattern(/^[0-9]{10}$/),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),

  role: Joi.string().trim().required().messages({
    "any.required": "role is required",
    "string.empty": "role name is required",
    "string.base": "role name must be a string",
  }),
});

exports.validateRegister = validate(registerSchema);

const loginSchema = Joi.object({
  emailOrMobile: Joi.string().required(),
  password: Joi.string().required(),
});

exports.validateLogin = validate(loginSchema);
