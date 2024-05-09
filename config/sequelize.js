const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('teste-chatlab', 'user', 'user123', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
