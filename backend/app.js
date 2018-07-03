'use strict'
 
var express     = require('express');
var bodyParser  = require('body-parser');

var app = express();
// Cargar Rutas
var user_routes = require('./routes/user');

// Middlewares de body-parser ( se ejecuta antes de una petición http)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Rrequested-With,Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Allow', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
})
// Configurar cabeceras y cors

// rutas
app.use('/api', user_routes);


module.exports = app;