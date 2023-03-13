module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
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
  Cart.associate = (db) => {
    Cart.belongsTo(db.Customer, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Cart.belongsTo(db.FoodProduct, {
      foreignKey: {
        name: "foodID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Cart.hasMany(db.CartAddon, {
      foreignKey: {
        name: "cartID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Cart;
};
