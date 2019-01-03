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
    // make size category
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
    // save ski
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

// @route    POST api/skis
// @desc     Get related ski,search in size category
// @access   Public
router.post('/search',(req,res)=>{

    if(typeof req.body.skiLength === "object"){
        const search = {
            minLength : req.body.skiLength.min,
            maxLength : req.body.skiLength.max,
        }
        Size.find({length:{$gte:search.minLength,$lte:search.maxLength}})
         .populate('skis')
         .exec(function (err, data) {
            if (err){
               console.log(err)  
            }            
            res.json(data);
        });
    }else{
        const search = {
            length : req.body.skiLength
        }
        Size.find({length:search.length})
         .populate('skis')
         .exec(function (err, data) {
            if (err){
               console.log(err)  
            }            
            res.json(data);
        });
        
    }   
      
});



// @route    DELETE api/skis
// @desc     Delete a ski
// @access   Public
router.delete('/:id',(req,res)=>{
    Ski.findById(req.params.id)
        .then((ski)=> Ski.remove(ski).then(()=>res.json({success:true})))
        .catch(err=>res.status(404).json({success:false}))          
});


module.exports = router