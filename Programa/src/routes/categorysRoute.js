const express = require('express');
const CategoryP = require('../models/categorys');
const router = express.Router();
//POST : INSERTAR COSAS
router.post('/addCategory', async function(request, response) {
    const insertCat = new CategoryP({
        nameCategory: request.body.nameCategory
    });
    const insertCatDB = await insertCat.save();
    response.json(insertCatDB);
    console.log(request.body);
});

module.exports = router;