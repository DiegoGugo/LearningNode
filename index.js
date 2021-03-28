'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/HerbolariaAngel', { useNewUrlParser: true })
    .then(() => {
        console.log('La conexión a la base de datos fue exitosa');

        //Creaer servidor y escuchar peticiones
        app.listen(port, () => {
            console.log('Servidor en el puerto ' + port);
        });
    });