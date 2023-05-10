const express = require('express');
const shopBags = require('../models/shopBags');
const Product = require('../models/products');
const router = express.Router();
//POST : INSERTAR COSAS
router.post('/addShopBag', async function(request, response) {
    const insert = new shopBags({
        idUser: request.body.idUser,
        idProduct: request.body.idProduct,
        amount: request.body.amount
    });
    const insertShopBagsDB = await insert.save();
    response.json(insertShopBagsDB);
    console.log(request.body);
});

router.get('/getShopBag/:idUser', async function(request, response) {

    const shopBagsUser = await shopBags.find({ idUser: request.params.idUser });
    const array = [];
    for (let index = 0; index < shopBagsUser.length; index++) {

        const temp = shopBagsUser[index];
        const prod = await Product.findOne({ idProduct: temp.idProduct });

        const res = {
            sku: temp.idProduct,
            nameProduct: prod.productName,
            description: prod.description,
            cantidad: temp.amount,
            total: (prod.price * temp.amount),
        }

        array.push(res);
    }
    console.log(array);
    response.json(array);

});

router.delete('/deleteShopBag', async function(request, response) {

    const result = await shopBags.deleteOne({
        idUser: request.body.idUser,
        idProduct: request.body.idProduct,
        amount: request.body.amount
    })

    console.log('SE ELIMINO CORECTAMENTE EL PRODUCTO EN EL CARRITO');
    response.json({ status: 'deleted' });
});

module.exports = router;