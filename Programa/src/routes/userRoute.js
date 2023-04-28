const express = require('express');
const User = require('../models/user');
const router = express.Router();
//POST : INSERTAR COSAS
router.post('/addUser', async function(request, response) {
    const insert = new User({ //EL ID USER PONER AUTOMATICAMENTE TAMBIEN
        idUser: request.body.idUser,
        name: request.body.name,
        password: request.body.password,
        rol: request.body.rol,
        wallet: request.body.wallet
    });
    const insertUser = await insert.save();
    response.json(insertUser);
    console.log(request.body);
});

module.exports = router;