const { Order, OrderDetail, FoodProduct, Customer } = require("../models");
// const { validateCreatePost } = require("../validators/food_product-validators");
const fs = require("fs");
// const cloudinary = require("../utils/cloudinary");

exports.createOrder = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.customer);

    const newOrder = await Order.create({
      customerId: req.customer.id,
      totalPrice: req.body.totalPrice,
    });
    console.log(req.body.state);
    req.body.state.map(async (el) => {
      await OrderDetail.create({
        orderId: newOrder.id,
        foodID: el.id,
        quantity: el.quantity,
      });

      return;
    });

    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    console.log(req.customer.id);
    const orderWithDetails = await Order.findAll({
      // where: { customerId: req.customer.id },
      include: [
        {
          model: OrderDetail,
          include: { model: FoodProduct },
        },
        { model: Customer },
      ],
    });

    res.status(200).json(orderWithDetails);
  } catch (err) {
    next(err);
  }
};
