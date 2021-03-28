'use strict'
//Cargar modulos de node para crear servidor
const express = require('express');
const bodyParser = require('body-parser');

///Ejecutar express(HTTP)
var app=express();
//Cargar ficheros rutas
var article_routes=require('./routes/article')
//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//CORS

//añadir prefijos a rutas/cargar rutas
app.use('/',article_routes)
//Ruta o método de peruba para la API REST


//exportar modulo
module.exports=app;