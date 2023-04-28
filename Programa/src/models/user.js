const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    idUser: String,
    name: String,
    password: String,
    rol: String,
    wallet: Number
}, {
    versionKey: false
});

module.exports = model('users', userSchema);