const {
  PAYMENT_DETAILS_ACCEPTED,
  PAYMENT_DETAILS_PENDING,
  PAYMENT_DETAILS_NOTACCEPTED,
} = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const PaymentDetails = sequelize.define(
    "PaymentDetails",
    {
      payment: {
        type: DataTypes.STRING,
      },

      status: {
        type: DataTypes.ENUM(
          PAYMENT_DETAILS_ACCEPTED,
          PAYMENT_DETAILS_PENDING,
          PAYMENT_DETAILS_NOTACCEPTED
        ),
        allowNull: false,
        defaultValule: "PENDING",
      },
    },
    {
      underscored: true,
    }
  );
  PaymentDetails.associate = (db) => {
    PaymentDetails.belongsTo(db.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    PaymentDetails.hasMany(db.Delivery, {
      foreignKey: {
        name: "PaymentDetailsId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return PaymentDetails;
};
