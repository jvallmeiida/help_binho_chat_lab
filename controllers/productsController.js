const product = require('../models/Product');
const productVariation = require('../models/ProductVariation');

async function getAllProducts(req, res) {
  try {
    const products = await product.findAll();
    const variations = await productVariation.findAll();
    
    const productsWithVariations = products.map(product => {
      const productVariations = variations.filter(variation => variation.productId === product.id);
      return {
        id: product.id,
        name: product.name,
        prices: product.prices,
        variations: productVariations
      };
    });

    res.json(productsWithVariations);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
}

module.exports = {
  getAllProducts
};
