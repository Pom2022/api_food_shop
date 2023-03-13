const { FoodProduct, Customer } = require("../models");
const { validateCreatePost } = require("../validators/food_product-validators");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");

exports.createProductImage = async (req, res, next) => {
  try {
    console.log(req);
    const value = validateCreatePost({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      productImage: req.file?.path,
    });

    if (value.productImage) {
      value.productImage = await cloudinary.upload(value.productImage);
    }

    const product = await FoodProduct.create(value);
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
exports.updateProductImage = async (req, res, next) => {
  try {
    const value = validateCreatePost({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      productImage: req.file?.path,
    });

    if (value.productImage) {
      value.productImage = await cloudinary.upload(value.productImage);
    }

    const product = await FoodProduct.update(value, {
      where: { id: req.params.id },
    });

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getAllFoodProduct = async (req, res, next) => {
  try {
    const foodProducts = await FoodProduct.findAll();

    res.status(200).json({ foodProducts });
  } catch (err) {
    next(err);
  }
};

// exports.deleteFoodProducts = async (req, res, next) => {
//   console.log(req.params.foodProductId);
//   try {
//     const foodProduct = await FoodProduct.findOne({
//       where: { id: req.params.foodProductId },
//     });
//     if (!foodProduct) {
//       createError("this foodProduct was not found", 400);
//     }

//     await foodProduct.destroy();

//     const newFoodProducts = await FoodProduct.findAll();
//     res.status(201).json({ newFoodProducts });
//   } catch (err) {
//     next(err);
//   }
// };

exports.deleteFoodProducts = async (req, res, next) => {
  console.log(req.params.foodProductId);
  try {
    const result = await FoodProduct.destroy({
      where: { id: req.params.foodProductId },
    });
    if (result === 0) {
      createError("This food product was not found", 400);
    }

    const newFoodProducts = await FoodProduct.findAll();
    res.status(201).json({ newFoodProducts });
  } catch (err) {
    next(err);
  }
};
