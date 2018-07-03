'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var mdAuth = require('../middlewares/authenticate'); 
var mdAdmin = require('../middlewares/isAdmin')

// para usar middleware se pone como segundo parametro en método HTTP
api.get('/pruebas', [mdAuth.ensureAuth, mdAdmin.isAdmin],  UserController.pruebas);

api.post('/register', UserController.saveUser);

api.put('/update-user/:id', mdAuth.ensureAuth, UserController.updateUser)

api.post('/login', UserController.login);

module.exports = api;