const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const categorysSchema = new Schema({
    nameCategory: String
}, {
    versionKey: false
});

module.exports = model('category_products', categorysSchema);