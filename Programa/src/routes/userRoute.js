const express = require('express');
const User = require('../models/user');
const router = express.Router();
//POST : INSERTAR COSAS
router.post('/addUser', async function(request, response) {
    const lastRegister = await User.count();
    const insert = new User({ //EL ID USER PONER AUTOMATICAMENTE TAMBIEN
        idUser: "E" + (lastRegister + 1),
        name: request.body.name,
        password: request.body.password,
        rol: request.body.rol,
        wallet: request.body.wallet
    });
    const insertUser = await insert.save();
    response.json(insertUser);
    console.log(request.body);
});

router.post('/addCommonUser', async function(request, response) {
    const lastRegister = await User.count();
    const insert = new User({ //EL ID USER PONER AUTOMATICAMENTE TAMBIEN
        idUser: "E" + (lastRegister + 1),
        name: request.body.name,
        password: request.body.password,
        rol: "Common",
        wallet: 500
    });
    const insertUser = await insert.save();
    response.json(insertUser);
    console.log(request.body);
});

router.get('/getWallet/:idUser', async function(request, response) {
    const tempUser = await User.findOne({ idUser: request.params.idUser });
    const wallet = new User({ //EL ID USER PONER AUTOMATICAMENTE TAMBIEN
        wallet: tempUser.wallet
    });
    response.json(wallet);
    console.log(wallet);
});

module.exports = router;