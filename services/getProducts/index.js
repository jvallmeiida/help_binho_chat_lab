const axios = require('axios');

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

module.exports = { fetchProducts };