const mongoose = require('mongoose')
const Schema   = mongoose.Schema;
const Ski = require('./Ski');


//Create size schema
const SizeSchema = new Schema({
    length:{
        type:Number,
        require:true
    },
    skis : [{ type: Schema.Types.ObjectId, ref: 'Ski' }]
   

})
module.exports = mongoose.model('Size', SizeSchema);