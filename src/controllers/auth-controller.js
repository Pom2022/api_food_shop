const { Op } = require("sequelize");
const { Customer } = require("../models");
const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validators");
const bcrypt = require("bcryptjs");
const createError = require("../utils/create-error");

const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const value = validateRegister(req.body);
    console.log(value);
    const customer = await Customer.findOne({
      where: {
        [Op.or]: [{ email: value.email || "" }, { mobile: value.mobile || "" }],
      },
    });
    console.log(customer);
    if (customer) {
      createError("email or mobile is already in use", 400);
      console.log("already account");
    }
    value.password = await bcrypt.hash(value.password, 12);
    console.log("kkkk");
    await Customer.create(value);
    res.status(201).json({
      message: "register success. please log in to continue",
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    // SELECT * FROM customers WHERE email = value.emailOrMobile OR mobile = value.emailOrMobile
    const customer = await Customer.findOne({
      where: {
        [Op.or]: [
          { email: value.emailOrMobile },
          { mobile: value.emailOrMobile },
        ],
      },
    });
    if (!customer) {
      createError("invalid email or mobile or passwords", 400);
    }
    const isCorrect = await bcrypt.compare(value.password, customer.password);
    if (!isCorrect) {
      createError("invalid email or mobile or password", 400);
    }
    const accessToken = jwt.sign(
      { id: customer.id, role: customer.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ customer: req.customer });
};
