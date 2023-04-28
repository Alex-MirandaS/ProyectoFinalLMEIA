const express = require('express');
const shopBags = require('../models/shopBags');
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

module.exports = router;