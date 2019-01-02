const mongoose = require('mongoose')
const Schema   = mongoose.Schema;


//Create size schema
const ConfigSchema = new Schema({
    length:{
        type:Number,
        require:true
    },
    qty:{
        type:Number,
        require:true
    }
   

})
module.exports = ConfigSchema;