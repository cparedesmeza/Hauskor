//modelo: es una clase que nos da un molde para crear diferentes objetos. 

'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = Schema({
    sku: String,
    image: String,
    description: String,
    price: String,
    cent: String
});

module.exports = mongoose.model('Article', ArticleSchema);
//mongoDB pluraliza el modelo al momento de guardar la coleccion 
// además con el mongoose.model ---> guarda documentos  de este tipo y con esta estructura dentro de la coleccion article(s)