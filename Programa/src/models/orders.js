const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const ordersSchema = new Schema({
    idLOrders: String,
    idProduct: String,
    amount: Number
}, {
    versionKey: false
});

module.exports = model('orders', ordersSchema);