const axios = require('axios');
const product = require('../../models/product'); 
const productVariation = require('../../models/productVariation');

const endpointUrl = 'http://85.31.60.80:26500/search';

async function fetchProducts(productName) {
    try {
        const apiResponse = await axios.get(endpointUrl, {
            params: {
                text: productName
            }
        });

        if (apiResponse.status === 200) {
            return apiResponse.data;
        } else if (apiResponse.status === 503) {
            console.error('Erro de Service Unavailable:', apiResponse.statusText);
            throw new Error(`Erro de Service Unavailable: ${apiResponse.statusText}`);
        } else {
            throw new Error(`Erro na requisição: ${apiResponse.status}`);
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error.message);
        throw error;
    }
}

async function saveProductsToDatabase(productName) {
    try {
        const productsData = await fetchProducts(productName); 
        if (!productsData || !productsData.data || !productsData.data.products) {
            throw new Error('Dados inválidos retornados da API');
        }

        const productTitle = productsData.data.title;
        const productPrices = productsData.data.prices;
        const variationsData = productsData.data.products      

        const productCreate = await product.create({
            productName: productTitle,
            prices: productPrices
        });

        for (const variationData of variationsData) {
          try {
              const newVariation = await productVariation.create({
              imageUrl: variationData.image_url,
              price: variationData.price,
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
        
        console.log('Produtos salvos com sucesso no banco de dados');
    } catch (error) {
        console.error('Erro ao salvar produtos no banco de dados:', error.message);
        throw error;
    }
}

saveProductsToDatabase('notebook')
