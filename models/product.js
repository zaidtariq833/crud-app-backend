const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Product extends Model {}

  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      thumbnail: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    },
  );

  return Product;
};
