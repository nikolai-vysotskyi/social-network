    const Sequelize = require('sequelize');
    const db = require('../config/database');

    const DigitalAsset = db.define('digitalAsset', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ownerId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        forSale: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    module.exports = DigitalAsset;