'use strict'

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ParqueAutomotriz', (err, res) => {
    if(err){
        throw err;
    }else{
        console.log('conected to mongodb db ParqueAutomotriz')
    }
})