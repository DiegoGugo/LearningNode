'use strict'

var validator = require('validator');
var Article = require('../models/article')

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

    }
}

module.exports = controller;