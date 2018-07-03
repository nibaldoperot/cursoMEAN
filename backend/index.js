'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.connect('mongodb://localhost:27017/ParqueAutomotriz', (err, res) => {
    if(err){
        throw err;
    }else{
        console.log('conected to mongodb db ParqueAutomotriz')
    }
}).then(()=>{
    app.listen(port, () =>{
        console.log('running on port='+ port)
    })
})