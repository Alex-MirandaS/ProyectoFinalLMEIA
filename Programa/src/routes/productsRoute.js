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

router.get('/getCatalogueProducts', async function(request, response) {

    const catal = await Catalogue.find({ status: 'accepted' });
    const array = [];
    for (let index = 0; index < catal.length; index++) {
        const temp = catal[index];
        const prod = await Product.findOne({ idProduct: temp.idProduct });
        array.push(prod);
    }
    response.json(array);

});

router.get('/getRequestProducts', async function(request, response) {

    const catal = await Catalogue.find({ status: 'inProcess' });
    const array = [];
    for (let index = 0; index < catal.length; index++) {
        const temp = catal[index];
        const prod = await Product.findOne({ idProduct: temp.idProduct });
        array.push(prod);
    }
    response.json(array);

});

router.get('/getProduct/:idProduct', async function(request, response) {
    const productID = request.params.idProduct;
    const prod = await Product.findOne({ idProduct: productID });
    console.log(prod);
    response.json(prod);

});

router.post('/aceptedProduct', async function(request, response) {

    const listOrderTemp = await Catalogue.updateOne({
        idProduct: request.body.idProduct
    }, {
        "$set": {
            status: 'accepted'
        }
    });

    response.json({ status: 'accepted' });

});

module.exports = router;