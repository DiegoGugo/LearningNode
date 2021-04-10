'use strict'

var validator = require('validator');
var Article = require('../models/article')

var fs= require('fs')
var path=require('path')

var controller = {

    DatosCurso: (req, res) => {
        var hola = req.body.hola
        console.log(hola)
        return res.status(200).send({
            name: 'Herbolaria del angel',
            mision: 'Ganar dinero',
            hola
        })
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy el test'
        })
    },

    save: (req, res) => {
        var params = req.body;
        //validar 
        try {
            var validate_title = !validator.isEmpty(params.title)
            var validate_content = !validator.isEmpty(params.content)
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar'
            })
        }

        if (validate_title && validate_content) {

            //Crear el objeto a guardar
            var article = new Article();
            //Asignar valores
            article.title = params.title
            article.content = params.content
            article.image = null
            //Guardar el articulo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no s eha guardado'
                    })
                }

                //Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                })
            })

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            })
        }

    },

    getArticles: (req,res)=>{

        Article.find({}).sort('-_id').exec((err,articles)=>{

            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'Error al devolvcer los articulos'
                }) 
            }

            if(!articles){
                return res.status(404).send({
                    status:'error',
                    message:'No hay articulos para mostrar'
                }) 
            }

            return res.status(202).send({
                status:'succes',
                articles
            })
        })        
    },

    getArticle:(req,res)=>{
        //resuperar id
        var articleId=req.params.id;
        //comprobar que existe
        if(!articleId || articleId==null){
            return res.status(200).send({
                status:'error',
                message:'No existe el articulo'
            })
        }
        //devolverlo
        Article.findById(articleId, (err, article)=>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'Error al devolver los datos'
                })
            }

            if(!article){
                return res.status(404).send({
                    status:'error',
                    message:'No existe el articulo'
                })
            }

            return res.status(200).send({
                status:'success',
                article
            })
        })
    },

    update: (req, res)=>{
        //recoger el id
        var articleId=req.params.id;
        //recoger los datos que llegan
        var params=req.body;
        //validar los datos
        try {
            var validate_title = !validator.isEmpty(params.title)
            var validate_content = !validator.isEmpty(params.content)                          
        } catch (err) {            
            return res.status(500).send({
                status: 'error',
                message: 'faltan datos por enviar'
            })
        }        
        
        //encontrar y actualizar
        if (validate_title && validate_content) {

            //find and update
            Article.findByIdAndUpdate({_id: articleId}, {title:params.title}, {new:true}, (err, articleUpdated)=>{
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    })
                }
                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    })
                }
                
                return res.status(200).send({
                    status:'success',
                    article:articleUpdated
                })
            })

        } else {
            return res.status(500).send({
                status: 'error',
                message: 'Los datos no son validos'
            })
        }
    },

    delete: (req, res)=>{
        //obtener el id
        var articleId=req.params.id;

        //find and delete
        Article.findOneAndDelete({_id: articleId}, (err, removeArticle)=>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message:'Error al borrar el articulo'
                })
            }

            if(!removeArticle){
                return res.status(200).send({
                    status:'error',
                    message:'No existe el articulo'
                })
            }

            return res.status(200).send({
                status:'success',
                article: removeArticle
            })
        })
    },

    upload:(req, res)=>{
        //configurar connect multiparty router/article.js

        //recoger el fichero
        var file_name='Nueva Imagen'

        if(!req.files){
            return res.status(404).send({
                status:'error',
                message: 'No se subio el archivo'
            })
        }
        //conseguir el nombre y la extension del archivo
        var file_path=req.files.file0.path
        var file_split=file_path.split('\\')

        var file_name = file_split[2]
        //comprobar la extension
        var ext_split=file_name.split('.');
        var file_ext=ext_split[1]

        return res.status(200).send({
            ext_split,
            ext_split,
            file_name
        })
        /*
        //si todo es valido
        if(file_ext != 'png' || file_ext != 'jpg' || file_ext != 'jpeg' || file_ext != 'gif'){
            //borrar el archivo
            fs.unlink(file_path, (err)=>{

                if(err){
                    return res.status(200).send({
                        status:'error',
                        message:'No es un archivo permitido'
                    })
                }                
            })
        }else{
            //Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
            var articleId=req.params.id

            Article.findOneAndUpdate({_id: articleId}, {image:file_name}, {new:true}, (err, articleUpdate)=>{
                if(err){
                    return res.status(500).send({
                        status:'error',
                        message:'Error al actualizar imagen'
                    })
                }

                if(!articleUpdate){
                    return res.status(500).send({
                        status:'error',
                        message:'No se actualizo imagen correctamente'
                    })
                }

                return res.status(200).send({
                    status:'success',
                    article: articleUpdate
                })
            })            
        }*/
    }
}

module.exports = controller;