const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const usersSchema = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    sex: { type: Boolean, require: true, default: true },
    birthday: { type: Date, require: false },
    roleId: { type: Number, require: true, default: 0 },
    fullname: { type: String, require: true, default: "Chưa đặt tên" }
}, {
        timestamps: true
    });

module.exports = mongoose.model('users', usersSchema);
