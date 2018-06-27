'use strict'
 
var express     = require('express');
var bodyParser  = require('body-parser');

var app = express();

// Cargar Rutas

// Middlewares de body-parser ( se ejecuta antes de una petición http)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors

// rutas

module.exports = app;