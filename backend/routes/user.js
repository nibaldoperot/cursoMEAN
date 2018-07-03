'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var mdAuth = require('../middlewares/authenticate'); 


// para usar middleware se pone como segundo parametro en método HTTP
api.get('/pruebas', mdAuth.ensureAuth,  UserController.pruebas);

api.post('/register', UserController.saveUser);

api.put('/update-user/:id', mdAuth.ensureAuth, UserController.updateUser)

api.post('/login', UserController.login);

module.exports = api;