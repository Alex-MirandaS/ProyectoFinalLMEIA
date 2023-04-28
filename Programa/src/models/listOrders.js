const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const listOrdersSchema = new Schema({
    idLOrders: String,
    idUser: String,
    date: String,
    deadline: String,
    total: Number,
    status: String
}, {
    versionKey: false
});
module.exports = model('list_orders', listOrdersSchema);