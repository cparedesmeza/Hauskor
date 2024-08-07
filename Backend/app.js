'use strict'

//Cargar modulos de node para crear el servidor

var express = require('express'); //Crear modulo para generar el servidor
var bodyParser = require('body-parser'); // convertir los datos qu se adquieren a Json

//Ejecutar express para trabajar con (http)
var app = express();

//Cargar ficheros rutas
var article_routes = require('./routes/article');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cors: Es el acceso cruzado entre dominios (ips)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Añadir prefijos rutas / Cargar rutas
app.use('/api', article_routes);


//Exportar modulo (fichero actual)
module.exports = app;