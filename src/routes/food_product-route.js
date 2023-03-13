const express = require("express");
const router = express.Router();
const foodProductController = require("../controllers/food_product-controller");
const upload = require("../middlewares/upload");

router.post(
  "/",
  upload.single("productImage"),
  foodProductController.createProductImage
);

router.patch(
  "/:id",
  upload.single("productImage"),
  foodProductController.updateProductImage
);

router.get("/getAllFoodProduct", foodProductController.getAllFoodProduct);

router.delete(
  "/deleteFoodProduct/:foodProductId",
  foodProductController.deleteFoodProducts
);

module.exports = router;
