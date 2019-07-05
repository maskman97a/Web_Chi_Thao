const express = require('express');
const router = express.Router();

const itemModel = require('../models/ItemsModel');

router.get('/', (req, res) => {
    try {
        itemModel.find({})
            .then(itemFound => res.status(200).json({ success: 1, itemFound }))
            .catch(err => res.json({ success: 0, err }))
    } catch (err) {
        res.statusCode(500).json({ success: 0, err });
    }
});

router.get('/:name', (req, res) => {
    var itemName = req.params.name;
    try {
        itemModel.findOne({ itemName: itemName })
            .then(itemFound => res.status(200).json({ success: 1, itemFound }))
            .catch(err => res.json({ success: 0, message: err }));
    } catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

module.exports = router;