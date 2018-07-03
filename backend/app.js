'use strict'
 
var express     = require('express');
var bodyParser  = require('body-parser');

var app = express();
// Cargar Rutas
var user_routes = require('./routes/user');

// Middlewares de body-parser ( se ejecuta antes de una petición http)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors

// rutas
app.use('/api', user_routes);


module.exports = app;