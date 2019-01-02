const mongoose = require('mongoose');
const Sizeschema = require('./Size');
const Schema   = mongoose.Schema;

//Create ski schema
const Skischema = new Schema({
    name:{
        type:String,
        require:true
    },
    model:{
        type:String,
        require:false
    },
    sizes:[Sizeschema],
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

const Ski = mongoose.model('Ski',Skischema);
module.exports = Ski;

