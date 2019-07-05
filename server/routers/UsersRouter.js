const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

const UserModel = require('../models/UsersModel');

router.post("/create", async (req, res) => {
    const { username, password, fullname, repassword } = req.body;
    const roleId = 0;
    try {
        if (password == repassword) {
            let userFound = await UserModel.findOne({ username });
            if (!userFound) {
                const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
                UserModel.create({ username, hashPassword, fullname, roleId }, (err, userCreated) => {
                    if (err) res.status(500).json({ success: 0, message: err })
                    else res.status(201).json({ success: 1, user: userCreated });
                    req.session.userInfo = {
                        username: userCreated.username,
                        fullname: userCreated.fullname,
                        roleId: userCreated.roleId
                    }
                });
            } else {
                res.json({ success: 0, message: "exists" });
            }
        } else {
            res.json({ success: 0, message: "Your password is not synchronized" })
        }
    } catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});


// get user by id
router.get("/:id", (req, res) => {
    let userId = req.params.id;
    UserModel.findById(userId, (err, userFound) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else if (!userFound) res.status(404).json({ success: 0, message: "Not found!" })
        else res.json({ success: 1, user: userFound });
    });
});

router.use((req, res, next) => {
    const { userInfo } = req.session;
    if (userInfo && userInfo.role >= 1) {
        next();
    } else res.status(401).json({ success: 0, message: "Permission denied!" });
});
// "/api/users" => get all
router.get("/", (req, res, next) => {
    const { userInfo } = req.session;
    if (userInfo && userInfo.name == "Huy") {
        next();
    } else res.status(401).json({ success: 0, message: "Permission denied!" });
}, async (req, res) => {
    console.log("Get all user");
    try {
        const users = await UserModel.find({}, "name email avatar intro posts hashPassword")
            .populate("posts");
        res.json({ success: 1, users });
    } catch (error) {
        res.status(500).json({ success: 0, error: error })
    }
    // UserModel.find({}, "name email avatar intro posts")
    // 	.populate("posts")
    // 	.then(users => res.json({ success: 1, users }))
    // 	.catch(err => res.status(500).json({ success: 0, error: err }))
    // .exec((err, users) => {
    // 	if(err) res.status(500).json({ success: 0, error: err })
    // 	else res.json({ success: 1, users });
    // });
});



// Create user


// Edit user
router.put("/:id", async (req, res) => {

    // UserModel.findByIdAndUpdate(userId, { name, password, avatar, intro }, { new: true }, (err, userUpdated) => {
    // 	if(err) res.status(500).json({ success: 0, message: err })
    // 	else res.json({ success: 1, user: userUpdated });
    // });
    const userId = req.params.id;
    const { name, password, avatar, intro, posts } = req.body;

    // UserModel.findById(userId, (err, userFound) => {
    // 	if(err) res.status(500).json({ success: 0, message: err })
    // 	else if(!userFound) res.status(404).json({ success: 0, message: "Not found!" })
    // 	else {
    // 		for(key in { name, password, avatar, intro, posts }) {
    // 			if(userFound[key] && req.body[key]) userFound[key] = req.body[key];
    // 		}

    // 		userFound.save((err, userUpdated) => {
    // 			if(err) res.status(500).json({ success: 0, message: err })
    // 			else res.json({ success: 1, user: userUpdated });
    // 		});
    // 	};
    // });

    // UserModel.findById(userId)
    // 	.then(userFound => {
    // 		if(!userFound) {
    // 			res.status(404).json({ success: 0, message: "Not found!" });
    // 		} else {
    // 			for(key in { name, password, avatar, intro, posts }) {
    // 				if(userFound[key] && req.body[key]) userFound[key] = req.body[key];
    // 			}
    // 			return userFound.save();
    // 		}
    // 	})
    // 	.then(userUpdated => res.json({ success: 1, user: userUpdated }))
    // 	.catch(err => res.status(500).json({ success: 0, message: err }));

    try {
        const userFound = await UserModel.findById(userId);
        if (!userFound) {
            res.status(404).json({ success: 0, message: "Not found!" });
        } else {
            for (key in { name, password, avatar, intro, posts }) {
                if (userFound["hashPassword"] && req.body["password"]) {
                    const plainPasswordNew = req.body["password"];
                    const hashPasswordOld = userFound["hashPassword"];
                    if (!bcrypt.compareSync(plainPasswordNew, hashPasswordOld)) {
                        userFound["hashPassword"] = bcrypt.hashSync(plainPasswordNew, bcrypt.genSaltSync());
                    }
                } else if (userFound[key] && req.body[key]) userFound[key] = req.body[key];
            }
            let userUpdated = await userFound.save();
            res.json({ success: 1, user: userUpdated });
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error })
    }
});

// Delete user => BTVN
router.delete("/:id", (req, res) => {
    const userId = req.params.id;
    UserModel.remove({ _id: userId }, (err) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else res.json({ success: 1 });
    });
});

module.exports = router;