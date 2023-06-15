const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 1000
    }
});

module.exports = User;