const express = require("express");
const router = express.Router();
const foodProductController = require("../controllers/food_product-controller");
const upload = require("../middlewares/upload");

const orderController = require("../controllers/order-controller");

router.post(
  "/",

  orderController.createOrder
);

router.get("/getAllFoodProduct", orderController.getAllOrder);

module.exports = router;
