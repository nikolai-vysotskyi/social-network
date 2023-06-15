const Sequelize = require('sequelize');
const db = require('../config/database');

const Like = db.define('like', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Like;