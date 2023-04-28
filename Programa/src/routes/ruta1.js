//MODELO DE UNA RUTA
const express = require('express');
const router = express.Router();
const Product = require('../models/products');
//METODO POST
router.post('/prueba', async function(request, response) {
    const productTemp = await Product.find({
        idProduct: 'P1'
    }).limit(1);
    const operation = (productTemp[0].price * 5);
    console.log(productTemp[0].price);
    console.log(operation);
    response.send(productTemp);
    //const operation = ((Number(productTemp.price)) * 5);
});

function get(params) {

}
//RECIBIR PARAMETROS DESDE EL GET
//METODO GET CON PARAMETROS
router.get('/prueba1/:param1/:param2', function(request, response) {
    const para1 = request.params.param1;
    const para2 = request.params.param2;
    response.render('resultado', { resultado: (para1 + para2) }) //RENDER ENVIA EL NOMBRE DE LA RESPUESTA, Y UN JSON
        /*response.json({ //enviar json en vez de texto
            "param1": para1,
            "param2": para2
        })*/
});

//EXPORTAR RUTA PARA SU USO EN EL INDEX
module.exports = router;