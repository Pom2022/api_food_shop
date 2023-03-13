const Joi = require("joi");

const validate = require("./validate");

const createFoodProductSchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim(),
  price: Joi.string().trim(),
  productImage: Joi.string().trim(),
}).or("name", "description", "price", "productImage");

exports.validateCreatePost = validate(createFoodProductSchema);
