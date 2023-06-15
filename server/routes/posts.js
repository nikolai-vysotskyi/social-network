const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const DigitalAsset = require('../models/DigitalAsset');
const User = require("../models/User");
const Like = require("../models/Like");
const postPrice = require("../controllers/postPrice");
const auth = require("../middleware/auth");
const {Sequelize} = require("sequelize");

router.post('/', auth, async (req, res) => {
    const {userId} = req;
    const {text} = req.body;
    try {
        const post = await Post.create({userId, text});
        await DigitalAsset.create({postId: post.id, ownerId: userId});
        res.json(post);
    } catch (e) {
        console.log(e)
    }
});

router.get('/:id/like', auth, async (req, res) => {
    const {userId} = req;
    const postId = req.params.id;

    const existingLike = await Like.findOne({
        where: {userId: userId, postId: postId}
    });

    if (existingLike) {
        return res.status(400).json({message: "You've already liked this post."});
    }

    const like = await Like.create({userId, postId});
    await like.save();

    await postPrice(req.params.id)

    const post = await Post.findOne({
        attributes: {
            include: [[Sequelize.literal('(SELECT COUNT(*) FROM likes WHERE likes.postId = post.id)'), 'likeCount']]
        },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: DigitalAsset,
                attributes: ['id', 'forSale', 'price', 'ownerId'],
            },
            {
                model: Like,
                attributes: ['userId'],
                where: {userId: req.userId},
                required: false
            },
        ],
    });

    res.json(post);
});

router.delete('/:id/like', auth, async (req, res) => {
    const {userId} = req;
    const postId = req.params.id;

    const existingLike = await Like.findOne({where: {userId: userId, postId: postId}});

    if (!existingLike) {
        return res.status(400).json({message: "You didn't like this post yet."});
    }

    await existingLike.destroy();

    await postPrice(req.params.id)

    const post = await Post.findOne({
        attributes: {
            include: [[Sequelize.literal('(SELECT COUNT(*) FROM likes WHERE likes.postId = post.id)'), 'likeCount']]
        },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: DigitalAsset,
                attributes: ['id', 'forSale', 'price', 'ownerId'],
            },
            {
                model: Like,
                attributes: ['userId'],
                where: {userId: req.userId},
                required: false
            },
        ],
    });

    res.json(post);
});

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: {
                include: [[Sequelize.literal('(SELECT COUNT(*) FROM likes WHERE likes.postId = post.id)'), 'likeCount']]
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: DigitalAsset,
                    attributes: ['id', 'forSale', 'price', 'ownerId'],
                    include: {
                        model: User,
                        attributes: ['id', 'name']
                    },
                },
                {
                    model: Like,
                    attributes: ['userId'],
                    where: {userId: req.userId},
                    required: false
                },
            ],
            group: ['post.id', 'likes.id'],
            order: [['createdAt', 'DESC']]
        });
        res.json(posts);
    } catch (e) {
        console.log(e)
    }
});

router.get('/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    res.json(post);
});

router.put('/:id', async (req, res) => {
    const {text} = req.body;
    const post = await Post.findByPk(req.params.id);
    post.text = text;
    await post.save();
    res.json(post);
});

router.delete('/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    await post.destroy();
    res.json({message: 'Post deleted'});
});

module.exports = router;