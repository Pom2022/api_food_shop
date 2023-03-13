const order = require("./order");

module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define(
    "Delivery",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  Delivery.accociate = (db) => {
    Delivery.belongsTo(db.Customer, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Delivery.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Delivery.belongsTo(db.PaymentDetails, {
      foreignKey: {
        name: "PaymentDetailsId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    FoodProduct.belongsTo(db.FoodProduct, {
      forerignKey: {
        name: "foodProductID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Delivery;
};
