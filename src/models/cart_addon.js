module.exports = (sequlize, DataTypes) => {
  const CartAddon = sequlize.define(
    "CartAddon",
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
  CartAddon.associate = (db) => {
    CartAddon.belongsTo(db.FoodAddon, {
      forerignKey: {
        name: "foodAddonID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    CartAddon.belongsTo(db.Cart, {
      forerignKey: {
        name: "CartID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return CartAddon;
};
