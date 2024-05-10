'use strict';

const Product = require('../models/Product'); 

module.exports = {
  up: async () => {
    const productsData = [
      {
        name: 'iPhone 14',
        price: 1200.00,
        description: 'O mais recente iPhone com tecnologia avançada.'
      },
      {
        name: 'Notebook Samsung Galaxy Book2',
        price: 1500.00,
        description: 'Um poderoso notebook para todas as suas necessidades de computação.'
      },
      {
        name: 'Smartwatch Amazfit Gts 4',
        price: 300.00,
        description: 'Um smartwatch elegante com muitos recursos úteis.'
      }
    ];

    await Product.bulkCreate(productsData);

    console.log('Produtos populados com sucesso!');
  },

  down: async () => {
    await Product.destroy({ where: {} });

    console.log('Registros de produtos removidos com sucesso!');
  }
};
