module.exports = (sequelize, DataTypes) => {
  const OrderAddon = sequelize.define(
    "OrderAddon",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    {
      underscored: true,
    }
  );

  OrderAddon.associate = (db) => {
    OrderAddon.belongsTo(db.OrderDetail, {
      foreignKey: {
        name: "orderDetailsId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    OrderAddon.belongsTo(db.FoodAddon, {
      foreignKey: {
        name: "foodAddonID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return OrderAddon;
};
