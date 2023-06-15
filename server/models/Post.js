const Sequelize = require('sequelize');
const db = require('../config/database');

const Post = db.define('post', {
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
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Post;