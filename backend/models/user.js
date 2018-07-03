'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name        : String,
    username    : String,
    password    : String,
    email       : String, 
    rol         : String
});

module.exports = mongoose.model('User', UserSchema);
// Mongoose pluraliza la colección