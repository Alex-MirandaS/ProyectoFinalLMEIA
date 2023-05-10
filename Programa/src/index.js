//MODELO DEL INDEX
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
//RUTAS
const ruta1 = require('./routes/ruta1');
const userRoutes = require('./routes/userRoute');
const productsRoutes = require('./routes/productsRoute');
const shopBagsRoutes = require('./routes/shopBagsRoute');
const ordersRouters = require('./routes/ordersRoute');
const categoryRouters = require('./routes/categorysRoute');
const catalogueRouters = require('./routes/cataloguesRoute');
const loginRouters = require('./routes/loginRoute');
//const path = require('path');


//CONFIGURACIONES
//USO DE JSON
app.use(express.json());
app.use(cors());
//CONEXION CON LA BASE DE DATOS DE MONGODB
async function start() {
    try {
        const db = await mongoose.connect('mongodb://localhost:27017/eCommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });
        console.log('Conectado a la base de datos: ', db.connection.name);
    } catch (error) {
        console.log(error);
    }
}
start();
//METODO SET
/*
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
    //METODO GET
app.get('/', function(request, response) {
    console.log('RESPUESTA DEL SERVIDOR');
    response.send('ESTA ES LA RESPUESTA')
});
*/
//USO DE RUTAS
app.use('/api', ruta1);
app.use('/api', userRoutes);
app.use('/api', productsRoutes);
app.use('/api', shopBagsRoutes);
app.use('/api', ordersRouters);
app.use('/api', categoryRouters);
app.use('/api', catalogueRouters);
//RUTAS DE VERIFICACION
app.use('/api', loginRouters)
    //MODELO
app.listen(3000);
console.log('EL SERVIDOR SE INICIO EN EL PUERTO 3000');