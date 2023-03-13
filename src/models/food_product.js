module.exports = (sequelize, DataTypes) => {
  const FoodProduct = sequelize.define(
    "FoodProduct",
    {
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      productImage: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
  FoodProduct.associate = (db) => {
    FoodProduct.hasMany(db.OrderDetail, {
      foreignKey: {
        name: "foodID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    FoodProduct.hasMany(db.Cart, {
      foreignKey: {
        name: "foodID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    FoodProduct.belongsTo(db.FoodAddon, {
      forerignKey: {
        name: "foodAddonID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    FoodProduct.hasOne(db.ProductReviews, {
      forerignKey: {
        name: "foodProductID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    FoodProduct.hasMany(db.Delivery, {
      forerignKey: {
        name: "foodProductID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    FoodProduct.hasMany(db.FoodProduct, {
      forerignKey: {
        name: "foodAddonID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return FoodProduct;
};
