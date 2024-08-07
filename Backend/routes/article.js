'use strict'




var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./upload/articles'});//Middleware: Funcionalidad: hace que se ejecutan los metodos de la ruta antes que los metodos que tenemos en el controlador

//Rutas de prueba
router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

//Rutas útiles

router.post('/save',ArticleController.save); // Post: Se utiliza para guardar datos en la base de datos o mandarlo al back end.
router.get('/articles/:last?',ArticleController.getArticles);
router.get('/article/:id',ArticleController.getArticle);//Get: Se utiliza para sacar datos de la base de datos
router.put('/article/:id',ArticleController.update); //Put: Se utiliza para actualizar 
router.delete('/article/:id',ArticleController.delete);
router.delete('/articles',ArticleController.deleteAll);
router.post('/upload-image/:id', md_upload, ArticleController.upload);
router.get('/get-image/:image',ArticleController.getImage);
router.get('/search/:search',ArticleController.search);

module.exports = router;