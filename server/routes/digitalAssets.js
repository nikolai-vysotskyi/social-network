const express = require('express');
const router = express.Router();
const DigitalAsset = require('../models/DigitalAsset');

const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const digitalAssets = await DigitalAsset.findAll();
    res.json(digitalAssets);
});

router.get('/:id', async (req, res) => {
    const digitalAsset = await DigitalAsset.findByPk(req.params.id);
    res.json(digitalAsset);
});

router.put('/:id', auth, async (req, res) => {
    try {
        const {forSale} = req.body;
        const digitalAsset = await DigitalAsset.findByPk(req.params.id);
        digitalAsset.forSale = forSale;
        await digitalAsset.save();

        res.json(digitalAsset);
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;