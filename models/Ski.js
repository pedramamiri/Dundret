const mongoose = require('mongoose');
const ConfigSchema = require('./Config');
const Schema   = mongoose.Schema;

//Create ski schema
const SkiSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    model:{
        type:String,
        require:false
    },
    configs:[ConfigSchema],
    price:{
        type:Number,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    }

})

const Ski = mongoose.model('Ski',SkiSchema);
module.exports = Ski;

