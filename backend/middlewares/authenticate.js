'use strict'

var jwt = require('jwt-simple')
var moment = require('moment');
var secret = 'clave_parque_automotriz';

// next es para pasar a lo siguiente, es decir, 
// que no quede la petición pegada en ensureAuth
exports.ensureAuth =  function(req,res,next){
    //ver si llega cabecera
    if(!req.headers.authorization){
        return res.status(403).send({
            message: 'petición sin cabecera de autenticación'
        })
    }
    // comillas simples y dobles sustituidas
    var token = req.headers.authorization.replace(/["'"]+/g,'');
    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'el token ha expirado'
            });
        }
    }catch(ex){
        return res.status(404).send({
            message: 'el token no es válido'
        });
    }

    req.user = payload;

    //salir del middleware hacia el método http
    next();
}