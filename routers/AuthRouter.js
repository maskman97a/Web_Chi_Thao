const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();

const UserModel = require('../models/UsersModel');

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        let userFound = await UserModel.findOne({ username });
        if (!userFound || !userFound._id) {
            res.status(404).json({ success: 0, message: "No such user" });
        } else {
            if (!bcrypt.compareSync(password, userFound.hashPassword)) {
                res.status(401).json({ success: 0, message: "Wrong password" });
            } else {
                req.session.userInfo = {
                    id: userFound._id,
                    username: userFound.username,
                    fullname: userFound.fullname,
                    roleId: userFound.roleId
                }
                // admin: 1, user: 0
                res.json({ success: 1, message: "Login successful" });
            }
        }
    } catch (error) {
        res.status(500).json({ success: 0, error })
    }
});

router.delete("/logout", (req, res) => {
    req.session.userInfo = undefined;
    req.session.destroy();
    res.json({ success: 1, message: "Logout successful" });
});

module.exports = router;