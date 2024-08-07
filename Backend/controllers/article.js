'use strict'
const { MongoClient, ObjectID } = require('mongodb');

var validator = require('validator');
var fs = require('fs');
var path = require('path');
var Article = require('../models/article');
const article = require('../models/article');


var controller = {

    datosCurso:  function(req, res) { 
        var hola = req.body.hola;
        return res.status(200).send({
            curso: 'Master en frameworks',
            autor:  'Victor Robles',
            url: 'victorobles.com',
            hola: 'Que tal'
        });
    },

    test: function (req, res)  {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de articulos'
        });
    },
    // GUARDA UN ARTICULO EN LA COLECCIÓN ARTICLES Y REGRESA COMO RESPONSE EL ID INSERTADO DE ESE ARTICULO.
    save: (req, res) =>  {
        //Recoger los parametros por post
        var params = req.body; 
        //Validar datos (validator)
        try {
            var validate_sku = !validator.isEmpty(params.sku);
            console.log(validate_sku);
            var validate_image = !validator.isEmpty(params.image);
            console.log(validate_image);
            var validate_description = !validator.isEmpty(params.description);
            console.log(validate_description);
            var validate_price = !validator.isEmpty(params.price);
            console.log(validate_price);
            var validate_cent = !validator.isEmpty(params.cent);
            console.log(validate_cent);

        } catch (error) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }
        if (validate_sku && validate_image && validate_description && validate_price && validate_cent){
            //Crear el objeto a guardar
            var article = new Article();
            // Asignar valores
            article.sku = params.sku;
            article.image = params.image;
            article.description = params.description;
            article.price = params.price;
            article.cent = params.cent;
            //Guardar el articulo
            article.save().then((articleStored) => {
               
                if(!articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }
                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleStored._id.toString(),
                });
                
            })
            .catch((error) => {
                return res.status(500).send({
                    status: 'error',
                    message: 'Ha ocurrido un eror' + error
                    });
            });
        }
        else{
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }
    },

    getArticles: (req,res) => {
        // Find

        var query = Article.find({});

        var last = req.params.last;
        if(last || last != undefined){
            query.limit(5);
        }

        query.sort('-id').exec().then((articles) => {
           
           if(!articles){
            return res.status(404).send({
                status: 'Error',
                message: 'No hay articulos para mostrar'
            });    
           } 
            return res.status(200).send({
                status: 'Success',
                articles
            }); 
        })
        .catch((error) => {
            return res.status(500).send({
                status: 'Error',
                message: 'Error al devolver los articulos'
            });    
        });
    },

    getArticle: (req,res) => {

        //Recoger el valor de ID en la URL
        var articleId = req.params.id;
        
        //comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'Error',
                message : 'No hay articulo para mostrarse' 
            });
        }
        //Buscar el articulo
        Article.findById(articleId).then(article =>{

        if(!article){
            return res.status(404).send({
                status: 'Error',
                message : 'No hay articulo para mostrar' 
            });
        }
        //Devolver en json
        return res.status(200).send({
            status: 'Success',
            article
        });
        })
        .catch((error) =>{
        return res.status(500).send({
            status: 'Error',
            message : 'Error al devolver los datos' 
            });
        });
    },

    update: (req,res) => {

        //Recoger el valor de ID en la URL
        var articleId = req.params.id;
        
        //Recoger los datos que llegan por put
        var params = req.body;
    
        //Validar datos
        try {
            var validate_sku = !validator.isEmpty(params.sku);
            var validate_image = !validator.isEmpty(params.image);
            var validate_description = !validator.isEmpty(params.description);
            var validate_price = !validator.isEmpty(params.price);
            var validate_cent = !validator.isEmpty(params.cent);

            if (validate_sku && validate_image && validate_description && validate_price && validate_cent){
                    //Find and Update
                    Article.findOneAndUpdate({_id: articleId},params,{new:true}).then((articleUpdated) =>{
                        if(!articleUpdated){
                            return res.status(404).send({
                                status: 'Error',
                                message : 'No existe el articulo' 
                            });
                        }
                        //Devolver en json
                        return res.status(200).send({
                            status: 'Success',
                            article: articleUpdated
                        });
                    })
                    .catch((error) => {
                        return res.status(500).send({
                        status: 'Error',
                        message : 'Error al actualizar' 
                        });
                    });
                } 
                else{
                    return res.status(200).send({
                    status: 'Error',
                    message : 'La validación no es correcta' 
                    });  
                }    
        } catch (error) {
            return res.status(200).send({
                status: 'Error',
                message : 'Faltan datos por enviar' 
            });
        }
    },

    delete: (req,res) => {
        
        //Recoger el valor de ID en la URL
        var articleId = req.params.id;
       
        //Find and delete
        Article.findOneAndDelete({_id: articleId}).then((articleRemoved) =>{
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'Error',
                    message : 'No se ha borrado el articulo, probablemente no existe el articulo' 
                });
            }
            //Devolver en json
            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        })
        .catch((error) => {
            return res.status(500).send({
            status: 'Error',
            message : 'Error al borrar' 
            });
        });
    },

    
    deleteAll: (req,res) => {
        
        //Recoger el valor de ID en la URL
        var collection = req.body.collectionName;
        console.log(collection);
        function isValidCollectionName(name) {
            // El nombre no debe estar vacío
            if (!name || typeof name !== 'string') {
                return false;
            }
        
            // No debe contener caracteres prohibidos
            const invalidChars = /[\0\/\.\s]/;
            if (invalidChars.test(name)) {
                return false;
            }
        
            // No debe empezar con "system."
            if (name.startsWith('system.')) {
                return false;
            }
        
            return true;
        }
        if(!isValidCollectionName(collection)){
            return res.status(400).send('Nombre de la coleccion invalida');
        }
        Article.collection.deleteMany({}).then((articleRemoved) =>{
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'Error',
                    message : 'No se ha borrado la collection' 
                });
            }
            //Devolver en json
            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        })
        .catch((error) => {
            return res.status(500).send({
            status: 'Error',
            message : 'Error al borrar' 
            });
        });

            

        
    
    },

    upload: (req,res) => {
        //Configurar el modulo de connect multiparty router/article.js (hecho(md_upload))

        //Recoger el fichero de la petición
        var file_name = 'Imagen no subida';
        if(!req.files){
            return res.status(404).send({
                status: 'Error',
                message: file_name
            });
        }
        //Conseguir el nombre y la extension del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');
        //Nombre del archivo
        var file_name = file_split[2];
        //Extension del archivo
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];
        //Comprobar la extension, solo imagenes, si no es valido borrar el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            // Borrar el archivo subido por que cada vez que se hace una requisición se genera un archivo
            fs.unlink(file_path, (err) =>{
                return res.status(200).send({
                    status: 'Error',
                    message: file_ext,
                    message: 'La extension de la imagen no es valida. Error:' + err
                });
            });
        }
        else{

            // Si todo el valido, se saca el ID de la url
            var articleId = req.params.id;
            //Buscar el articulo, asignarle el nombre de la imagen y actualizarlo.
            Article.findOneAndUpdate({_id: articleId}, {image:file_name}, {new:true}).then((articleUpdated) =>{
                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'Error',
                        message: 'Error al guardar la imagen del articulo'
                    }); 
                }
                return res.status(404).send({
                    status: 'Success',
                    articleUpdated
                }); 
            }).catch((err) =>{
                return res.status(404).send({
                    status: 'Error',
                    message: 'Error al actualizar el nombre del archivo'
                });   
            });

   
        }
       


        //Si todo es valido

    },

    getImage: (req,res) => {
        //
        var file = req.params.image;
        var path_file = './upload/articles/' + file;
        var exists = fs.existsSync(path_file);
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }
            else{
                return res.status(404).send({
                    status: 'Error',
                    message: 'La imagen no existe'
                });
            }
       
 
    },
    // YA FUNCIONA EL METODO
    search: (req,res) => {
        //Sacar el string a buscar
        var search_string = req.params.search;
        //Find  or 
        Article.find({ "$or":[
            {"sku":{"$regex":search_string, "$options": "i"}}, //si el search string esta incluido en el titulo entonces....
            {"content":{"$regex":search_string, "$options": "i"}},
        ]})
        .sort([['date', 'descending']])
        .exec().then((articles) =>{
            
            if(!articles || articles.length <= 0){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No hay articulos para mostrar'
                });
            }else{
                
                return res.status(200).send({
                    status: 'success',
                    articles
                });
            }
        })
        .catch((err)=>{
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error en la petición'
                });
        });

    }



}; //end controller

module.exports = controller;