const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const cataloguesSchema = new Schema({
    idProduct: String,
    status: String
}, {
    versionKey: false
});

module.exports = model('catalogues', cataloguesSchema);