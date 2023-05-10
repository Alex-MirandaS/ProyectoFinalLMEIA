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

router.get('/getCategorys', async function(request, response) {

    const categorys = await CategoryP.find();
    const array = [];
    for (let index = 0; index < categorys.length; index++) {
        const temp = categorys[index];
        const nameCategorys = {
            category: temp.nameCategory
        }
        array.push(nameCategorys);
    }
    response.json(array);
});

module.exports = router;