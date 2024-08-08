'use strict'

var mongoose = require('mongoose'); // para utilizar el modulo que se instalo desde node.js
var app = require('./app');
const port = process.env.Port || 3900;
//Crear servidor y ponerme a escuchar peticiones http
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:' + port);
});

const url = 'mongodb+srv://pruebaslocales51:12345@dbmongotest.eejnz.mongodb.net/'

//mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(url)
    .then(() => {
        console.log('Conexion a base de datos correcta!')
    })