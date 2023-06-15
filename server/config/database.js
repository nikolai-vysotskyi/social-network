const Sequelize = require('sequelize');

const sequelize = new Sequelize('social_network', 'root', 'mysecretpassword', {
    host: 'db',
    dialect: 'mysql'
});

module.exports = sequelize;
