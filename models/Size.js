const mongoose = require('mongoose')
const Schema   = mongoose.Schema;


//Create size schema
const Sizeschema = new Schema({
    length:{
        type:Number,
        require:true
    },
    qty:{
        type:Number,
        require:true
    }
   

})
module.exports = Sizeschema;