const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const DigitalAsset = require('../models/DigitalAsset');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const buyerId = req.userId;
    const { sellerId, assetId } = req.body;
    const buyer = await User.findByPk(buyerId);
    const seller = await User.findByPk(sellerId);
    const digitalAsset = await DigitalAsset.findByPk(assetId);
    const {price} = digitalAsset;

    if (buyer.balance < price) {
        return res.status(400).json({ message: 'Insufficient funds' });
    }
    if (digitalAsset.ownerId !== sellerId) {
        return res.status(400).json({ message: 'Seller does not own this digital asset' });
    }

    buyer.balance -= price;
    seller.balance += price;
    digitalAsset.ownerId = buyerId;
    digitalAsset.forSale = false;

    await buyer.save();
    await seller.save();
    await digitalAsset.save();
    await Transaction.create({ buyerId, sellerId, assetId, price });
    res.json(digitalAsset);
});

router.get('/', async (req, res) => {
    const transactions = await Transaction.findAll();
    res.json(transactions);
});

module.exports = router;