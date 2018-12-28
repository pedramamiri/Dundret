const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//Create ski schema
const Skischema = new Schema({
    name:{
        type:String,
        require:true
    },
    size:{
        type:Array,
        require:true
    },
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

