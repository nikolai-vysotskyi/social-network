const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const digitalAssetsRoutes = require('./routes/digitalAssets');
const transactions = require('./routes/transactions');

const sequelize = require('./config/database');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Post = require('./models/Post');
const DigitalAsset = require("./models/DigitalAsset");
const Like = require("./models/Like");

// Define relationships
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasOne(DigitalAsset, { foreignKey: 'postId' });
DigitalAsset.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(DigitalAsset, { foreignKey: 'ownerId' });
DigitalAsset.belongsTo(User, { foreignKey: 'ownerId' });

User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Like, { foreignKey: 'postId' });
Like.belongsTo(Post, { foreignKey: 'postId' });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/assets', digitalAssetsRoutes);
app.use('/api/transactions', transactions);

app.use((error, req, res) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 3005;

async function start() {
    try {
        await sequelize.sync({ force: true });
        app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();