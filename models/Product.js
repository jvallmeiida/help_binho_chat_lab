const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Product = sequelize.define('Product', {
    productName: {
    type: DataTypes.STRING,
    allowNull: false
    },
    prices: {
    type: DataTypes.JSONB,
    allowNull: false
    },
    productVariations: {
    type: DataTypes.JSONB,
    allowNull: false
    },
    seller: {
    type: DataTypes.JSONB,
    allowNull: false
    }
});

module.exports = Product;


// Nome do produto: string,
// Prices: {min: integer, med: integer, max: integer}
// product_variations: [{ image_url: string, price: integer, title: “string”}],
// Seller: {name: “string”, seller_url: “string”, scraped_from_url: “string”}
