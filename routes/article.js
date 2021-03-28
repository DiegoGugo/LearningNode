'use strict'

var express=require('express');
var ArticleController=require('../controllers/article')

var router =express.Router()

//rutas de práctica
router.get('/test-de-controlador', ArticleController.test)
router.post('/datos-curso', ArticleController.DatosCurso)

//rutas de verdad

router.post('/save',ArticleController.save)

module.exports=router;