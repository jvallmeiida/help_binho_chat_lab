const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const product = sequelize.define('product', {
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

module.exports = product;