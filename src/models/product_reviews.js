module.exports = (sequelize, DataTypes) => {
  const ProductReviews = sequelize.define(
    "ProductReviews",
    {
      reviews: {
        type: DataTypes.STRING,
      },

      rating: {
        type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
    }
  );
  ProductReviews.associate = (db) => {
    ProductReviews.belongsTo(db.Customer, {
      foreignKey: {
        name: "customerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductReviews.belongsTo(db.FoodProduct, {
      forerignKey: {
        name: "foodProductID",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return ProductReviews;
};
