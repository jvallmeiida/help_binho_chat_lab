const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const productVariation = sequelize.define('productVariation', {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.ARRAY(DataTypes.FLOAT),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sellerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sellerUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scrapedFromUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

});


module.exports = productVariation;
