const express = require('express');
const Catalogue = require('../models/catalogues');
const router = express.Router();
//POST : INSERTAR COSAS
router.post('/editCatalogue', async function(request, response) {

    const catalogueTemp = await Catalogue.find({
        idProduct: request.body.idProduct
    }).limit(1);

    await Catalogue.updateOne({
        idProduct: catalogueTemp[0].idProduct
    }, {
        "$set": {
            status: 'accepted'
        }
    });

    response.json(catalogueTemp);
});

module.exports = router;