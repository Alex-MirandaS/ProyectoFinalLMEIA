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

router.get('/getUser/:idUser', async function(request, response) {
    const user = await User.findOne({ idUser: request.params.idUser });
    response.json(user);
});

router.get('/getCustomeServices', async function(request, response) {
    const admins = await User.find({ rol: 'Admin' });
    const package = await User.find({ rol: 'Package' });
    const cs = admins.concat(package);
    response.json(cs);
});


router.post('/addCommonUser', async function(request, response) {
    const lastRegister = await User.count();
    const insert = new User({ //EL ID USER PONER AUTOMATICAMENTE TAMBIEN
        idUser: "E" + (lastRegister + 1),
        name: request.body.name,
        password: request.body.password,
        rol: "Common",
        wallet: 5000
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

router.post('/editUser', async function(request, response) {
    console.log(request.body);
    const editUser = await User.updateOne({
        idUser: request.body.idUser
    }, {
        "$set": {
            name: request.body.name,
            password: request.body.password,
            rol: request.body.rol
        }
    });
    response.json(editUser);
    console.log(editUser);
});



module.exports = router;