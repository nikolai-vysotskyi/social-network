const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');
const DigitalAsset = require('../models/DigitalAsset');

router.get('/:id/posts', async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { userId: req.params.id } });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:id/digitalAssets', async (req, res) => {
    try {
        const digitalAssets = await DigitalAsset.findAll({ where: { ownerId: req.params.id } });
        res.json(digitalAssets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', auth, async (req, res) => {
    const {userId} = req;

    try {
        const user = await User.findOne({ where: { id: userId } });
        if(!user) res.status(401).send('Unauthorization denied');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
