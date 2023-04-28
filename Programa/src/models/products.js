const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const productsSchema = new Schema({
    idProduct: String,
    idOwner: String,
    productName: String,
    price: Number,
    category: String,
    description: String
}, {
    versionKey: false
});

module.exports = model('products', productsSchema);