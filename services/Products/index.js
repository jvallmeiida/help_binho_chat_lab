const axios = require('axios');
const Product = require('../../models/Product'); 

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
        const productVariations = productsData.data.products;

        await Product.create({
            productName: productTitle,
            prices: productPrices,
            productVariations: productVariations.map(variation => ({
                imageUrl: variation.image_url,
                price: variation.price,
                title: variation.title,
                seller: {
                    Name: variation.seller, 
                    Url: variation.seller_url, 
                    scrapedFromUrl: variation.scraped_from_url
                }
            }))
        });
        
    } catch (error) {
        console.error('Erro ao salvar produtos no banco de dados:', error.message);
        throw error;
    }
}

saveProductsToDatabase('notebook')
