module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define(
    "OrderDetail",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // totalPrice: {
      //   type: DataTypes.DECIMAL(10, 2),
      // },
    },
    {
      underscored: true,
    }
  );
  OrderDetail.associate = (db) => {
    // Order to OrderDetail
    OrderDetail.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    OrderDetail.hasMany(db.OrderAddon, {
      foreignKey: {
        name: "orderDetailsId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    OrderDetail.belongsTo(db.FoodProduct, {
      foreignKey: {
        name: "foodID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return OrderDetail;
};
