const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const shopBagsSchema = new Schema({
    idUser: String,
    idProduct: String,
    amount: Number
}, {
    versionKey: false
});

module.exports = model('shop_bags', shopBagsSchema);