const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");
const { Customer } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("you are unauthorized", 401);
    }

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const customer = await Customer.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!customer) {
      createError("you are unauthorized", 401);
    }
    req.customer = customer;
    next();
  } catch (err) {
    next(err);
  }
};
