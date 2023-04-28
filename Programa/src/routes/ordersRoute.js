const express = require('express');
const controlD = require('../controladores/controlDate');
const controlG = require('../controladores/controlGeneral');
const listOrders = require('../models/listOrders');
const Orders = require('../models/orders');
const router = express.Router();
//POST : INSERTAR COSAS
//NOTA, SE ENVIA EL JSON DE LISTORDER PRIMERO, LUEGO LOS ORDERS
router.post('/addOrders', async function(request, response) {
    const numLO = await listOrders.count();
    const insertListOrder = new listOrders({
        idLOrders: "LO" + (numLO + 1),
        idUser: request.body.idUser,
        date: controlD.getDateToday(),
        deadline: controlD.getDatePlusDays(5),
        total: 0,
        status: "en curso"
    });

    const insertListOrderDB = await insertListOrder.save();

    //INSERTAR CADA ORDER
    const array = await controlG.getProductsSB(request.body.idUser);
    for (let index = 0; index < array.length; index++) {
        const temp = array[index];
        const insertOrders = new Orders({
            idLOrders: "LO" + (numLO + 1),
            idProduct: temp.idProduct,
            amount: temp.amount,
        });
        controlG.addToTotal(temp.idProduct, temp.amount);
        const insertOrdersDB = await insertOrders.save();
    }
    controlG.deleteShopBag(request.body.idUser);
    response.json(insertListOrder);
    console.log(request.body);
});

module.exports = router;