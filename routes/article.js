'use strict'

var express=require('express');
var ArticleController=require('../controllers/article')

var router =express.Router()

var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir: './upload/articles'})

//rutas de práctica
router.get('/test-de-controlador', ArticleController.test)
router.post('/datos-curso', ArticleController.DatosCurso)

//rutas de verdad

router.post('/save',ArticleController.save)
router.get('/articles', ArticleController.getArticles)
router.get('/article/:id', ArticleController.getArticle)
router.put('/update/:id', ArticleController.update)
router.delete('/delete/:id', ArticleController.delete)
router.post('/upload-image/:id', md_upload, ArticleController.upload)

module.exports=router;