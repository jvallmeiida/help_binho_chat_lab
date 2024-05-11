const product = require('../../models/product'); 
const productVariation = require('../../models/productVariation');
const { fetchProducts } = require('../getProducts');

async function saveProductsToDatabase(productName) {
  try {
      const productsData = await fetchProducts(productName); 
      const productTitle = productsData.data.title;
      const productPrices = productsData.data.prices;
      const variationsData = productsData.data.products      
      const existingProduct = await product.findOne({
        where: {
          name: productTitle
        }
      });

      if (!existingProduct) {
        const productCreate = await product.create({
          name: productTitle,
          prices: [productPrices]
        });

        for (const variationData of variationsData) {
          try {
              const newVariation = await productVariation.create({
                imageUrl: variationData.image_url,
                price: [variationData.price],
                title: variationData.title,
                sellerName: variationData.seller,
                sellerUrl: variationData.seller_url,
                scrapedFromUrl: variationData.scraped_from_url,
                productId: productCreate.id
              });
          
              console.log('Nova variação salva:', newVariation.toJSON());
          } catch (error) {
              console.error('Erro ao salvar a variação:', error);
          }
        }
      }

      console.log('Produtos salvos com sucesso no banco de dados');
  } catch (error) {
      console.error('Erro ao salvar produtos no banco de dados:', error.message);
      throw error;
  }
}

module.exports = { saveProductsToDatabase };