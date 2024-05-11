const cron = require('node-cron');
const { updateProducts } = require('../services/updateProducts');

const intervalMinutes = process.env.INTERVAL_MINUTES || 60; 

cron.schedule(`*/${intervalMinutes} * * * *`, async () => {
  try {
    console.log('Executando atualização de preços dos produtos...');
    await updateProductsPrices('iPhone 14');
    await updateProductsPrices('Notebook');
    await updateProductsPrices('Amazfit');

    console.log('Atualização de preços concluída.');
  } catch (error) {
    console.error('Erro ao atualizar preços dos produtos:', error);
  }
});
