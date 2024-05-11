const product = require('../../models/product'); 
const productVariation = require('../../models/productVariation');
const bcrypt = require('bcrypt');

async function updateProductsPrices(productName) {
  try {
    const productsData = await fetchProducts(productName); 
    const productTitle = productsData.data.title;
    const newProductPrice = productsData.data.prices;
    const variationsData = productsData.data.products;

    const existingProduct = await product.findOne({
      where: {
        name: productTitle
      }
    });

    if (existingProduct) {
      const lastPrice = existingProduct.prices[existingProduct.prices.length - 1];

      bcrypt.compare(lastPrice, newProductPrice, function(err, equal) {
        if (!equal) {
          existingProduct.prices.push(newProductPrice)
        }
      });


      for (const variationData of variationsData) {
        const existingVariation = await productVariation.findOne({
          where: {
            productId: existingProduct.id,
            title: variationData.title
          }
        });

        if (existingVariation) {
          await existingVariation.update({ price: variationData.price });
          console.log('Variação atualizada:', existingVariation.toJSON());
        }
      }
    } else {
      console.error('Produto não encontrado:', productTitle);
    }
  } catch (error) {
    console.error('Erro ao atualizar preços no banco de dados:', error.message);
    throw error;
  }
}

module.exports = { updateProductsPrices };
