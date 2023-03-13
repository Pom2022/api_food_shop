module.exports = (sequelize, DataTypes) => {
  const FoodAddon = sequelize.define(
    "FoodAddon",
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
  FoodAddon.associate = (db) => {
    FoodAddon.hasMany(db.FoodProduct, {
      forerignKey: {
        name: "foodAddonID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    FoodAddon.hasMany(db.OrderAddon, {
      forerignKey: {
        name: "foodAddonID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    FoodAddon.hasMany(db.CartAddon, {
      forerignKey: {
        name: "CartAddonID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    FoodAddon.hasMany(db.CartAddon, {
      forerignKey: {
        name: "foodAddonID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return FoodAddon;
};
