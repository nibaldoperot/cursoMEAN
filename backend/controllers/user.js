'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');

// servicio jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req,res){
    res.status(200).send({
        message : 'prueba',
        user: req.user
    })
}

function saveUser(req,res){
    
    //Creación de objecto de usuario
    var user = new User();

    //Obtener parametros de petición
    var params = req.body;

    
    if(params.password){
        // asigno parametros al objeto usuario
        user.name       = params.name
        user.username   = params.username
        user.password   = params.password
        user.email      = params.email
        user.rol        = params.rol
        
        User.findOne({ email : user.email.toLowerCase()}, (err,registeredUser) => {
            if(err){
                res.status(500).send({
                    message: 'error al comprobar correo de usuario'
                });
            }else{
                if(!registeredUser){
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;

                        // método save de mongoose
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({
                                    message: 'error al guardar el usuario'
                                });
                            } else {
                                if (!userStored) {
                                    res.status(500).send({
                                        message: 'No se ha registrado el usuario'
                                    });
                                } else {
                                    res.status(200).send({
                                        user: userStored
                                    });
                                }
                            }
                        })
                    });
                }else{
                    res.status(500).send({
                        message: 'correo ya registrado anteriormente'
                    });
                }
            }
        })

             
    }else{
        res.status(200).send({
            message: 'introduce los datos correctamente'
        });

    }
}

function login(req,res){
    var params =  req.body;
    var email = params.email;
    var password = params.password;


    User.findOne({ email: email.toLowerCase() }, (err, registeredUser) => {
        if (err) {
            res.status(500).send({
                message: 'error al comprobar correo de usuario'
            });
        } else {
            if (registeredUser) {
                bcrypt.compare(password, registeredUser.password, (err,check)=>{
                    if(check){
                        // comprobar y generar token
                        if(params.gettoken){  
                            //devolver token
                            res.status(200).send({
                                token: jwt.createToken(registeredUser)
                            });
                        }else{
                            res.status(200).send({
                                data: registeredUser
                            });
                        }
                    }else{
                        res.status(500).send({
                            message: 'usuario no ha podido loguearse correctamente'
                        });
                    }
                })
                
            }else{
                res.status(404).send({
                    message: 'correo no registrado'
                });
            }
        }
    })
}

function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body;

    if(userId != req.user.sub){
        res.status(500).send({
            message: 'No tienes permisos para actualizar este usuario'
        });
    }

    User.findByIdAndUpdate(userId, update, (err, userUpdated) =>{
        if(err){
            res.status(500).send({
                message: 'Error al actualizar usuario'
            });
        }else{
            if(!userUpdated){
                res.status(404).send({
                    message: ' No se ha podido actualizar el usuario'
                })
            }else{
                res.status(200).send({
                    user: userUpdated
                })
            }
        }
    })

}

module.exports = {
    pruebas,
    saveUser,
    updateUser,
    login
};