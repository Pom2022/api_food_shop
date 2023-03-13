module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    {
      underscored: true,
    }
  );
  Order.associate = (db) => {
    Order.belongsTo(db.Customer, {
      foreignKey: {
        name: "customerId",
        allowNull: true,
      },
      onDelete: "RESTRICT",
    });
    // Order to OrderDetail
    Order.hasMany(db.OrderDetail, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Order.hasMany(db.PaymentDetails, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Order.hasMany(db.Delivery, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Order;
};
