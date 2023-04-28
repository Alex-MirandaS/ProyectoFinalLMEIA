const express = require('express');
const Product = require('../models/products');
const Catalogue = require('../models/catalogues');
const router = express.Router();
//POST : INSERTAR COSAS
router.post('/addProduct', async function(request, response) {

    const numPrdct = await Product.count();
    const insertProduct = new Product({
        idProduct: "P" + (numPrdct + 1),
        idOwner: request.body.idOwner,
        productName: request.body.productName,
        price: request.body.price,
        category: request.body.category,
        description: request.body.description
    });
    const insertProductDB = await insertProduct.save();
    //INSERTAR EN CATALOGO
    const insertCatalogue = new Catalogue({
        idProduct: "P" + (numPrdct + 1),
        status: "inProcess"
    });
    const insertCatalogueDB = await insertCatalogue.save();

    response.json(insertProduct);
    console.log(request.body);
});

module.exports = router;