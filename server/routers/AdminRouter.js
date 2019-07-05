const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.session.userInfo) {
        if (req.session.userInfo.roleId == 1) {
            next();
        } else {
            res.status(403).send("Bạn không có quyền quy cập trang web này!").json({ success: 0 });
        }
    } else {
        res.status(403).send("Vui lòng đăng nhập!");
    }
});

const userModel = require('../models/UsersModel');
const itemModel = require('../models/ItemsModel');

const itemRouter = require("../routers/ItemsRouter");

router.use(express.static('private/admin'));

router.get('/', (req, res) => {
    itemModel.find({})
        .then(itemFound => res.status(200).json({ success: 1, itemFound }))
        .catch(err => res.status(500).json({ success: 0, message: err }));
});

router.post("/addItem", (req, res) => {
    var { itemName, itemLink, description, author } = req.body;
    try {
        if (itemName == undefined || itemName == null || itemLink == undefined || itemLink == null || itemName == "" || itemName == "") {
            res.json({ success: 0, message: "input is empty!" });
        } else {
            itemModel.create({ itemName, itemLink, description, author })
                .then(itemCreated => res.status(200).json({ success: 1, itemCreated }))
                .catch(err => res.json({ success: 0, message: err }));
        }
    } catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

router.use("item", itemRouter);



module.exports = router;

