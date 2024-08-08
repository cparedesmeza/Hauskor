'use strict'
require('dotenv').config();

var mongoose = require('mongoose'); // para utilizar el modulo que se instalo desde node.js
var app = require('./app');
const port = process.env.port;
//Crear servidor y ponerme a escuchar peticiones http
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:' + port);
});
const url = process.env.MONGODB_URI;

//mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(url)
    .then(() => {
        console.log('Conexion a base de datos correcta!')
    })