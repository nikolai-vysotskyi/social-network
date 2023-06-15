const Sequelize = require('sequelize');
const db = require('../config/database');

const Transaction = db.define('transaction', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    buyerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    assetId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

module.exports = Transaction;