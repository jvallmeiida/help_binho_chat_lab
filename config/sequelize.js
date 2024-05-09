const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test_chatlab_development', 'jv', '123456', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
