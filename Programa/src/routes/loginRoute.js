const express = require('express');
const User = require('../models/user');
const router = express.Router();
//verificar login

router.route("/login").post(async function(request, response) {
    const { name, password } = request.body;
    // Query the database to find the user with the given email and password
    const userTemp = await User.findOne({ name, password });

    if (userTemp) {
        response.send({
            'idUser': userTemp.idUser,
            'rol': userTemp.rol
        });
        //response.redirect('http://127.0.0.1:5500/Programa/src/views/HTML/home.html?data=' + name);
    } else {
        response.send({ 'idUser': '' });
    }
});



module.exports = router;