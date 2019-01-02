const express = require('express');
const router  = express.Router();

//skis model 
const Ski = require('../../models/Ski');
//Size Model
const Size = require('../../models/Size');


// @route    GET api/skis
// @desc     Get all skis
// @access   Public
router.get('/',(req,res)=>{
    Ski.find()
        .sort({name: 1})
        .then(skis=>res.json(skis))
});

// @route    POST api/skis
// @desc     Add a new ski && build saze category att the same time
// @access   Public
router.post('/',(req,res)=>{

    const newSki = new Ski({
        name      : req.body.name,
        model     : req.body.model,
        price     : req.body.price,
        image     : req.body.image,
        type      : req.body.type,
        desc      : req.body.desc,
        configs   : req.body.configs.map(config =>(
            {
                length      : config.length,
                qty         : config.qty,
            } 
        ))    
    })
    
    function buildingSizeCategory(){
        return new Promise((resolve,reject)=>{
            req.body.configs.map(config=>{
                Size.updateOne(
                    {length:config.length},
                    {  
                        "$set": { "length": config.length },
                        "$push": { "skis": newSki._id }     
                    },
                    {upsert:true},
                    (err,size)=>{
                        if (err) return res.json(err); 
                    }
                )  
            }) 
            resolve({success:true})
        })
    };
    const saveSki =(function(){
        return new Promise((resolve,reject)=>{
            newSki.save()
             .then(ski=>resolve(ski))
        })
    })()
        .then(()=> {
            buildingSizeCategory()
            .then((success)=>res.json(success))
        })
        .catch((err)=> res.json(err))
});



// @route    DELETE api/families
// @desc     Delete a family
// @access   Public
/*router.delete('/:id',(req,res)=>{
    Family.findById(req.params.id)
        .then((family)=> Family.remove(family).then(()=>res.json({success:true})))
        .catch(err=>res.status(404).json({success:false}))          
});
*/

module.exports = router