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

// @route    POST api/skis/search
// @desc     Get related ski,search in size category
// @access   Public
router.post('/search',(req,res)=>{

    if(typeof req.body.skiLength === "object"){
        const search = {
            minLength : req.body.skiLength.min,
            maxLength : req.body.skiLength.max,
            type      : req.body.type
        }
        Size.find({length:{$gte:search.minLength,$lte:search.maxLength}})
         .populate({
             path: 'skis',
             match: { 
                 type: search.type,
                 }
            })
         .exec(function (err, data) {
            if (err){
               console.log(err)  
            }            
            res.json(data);
        });
    }else{
        const search = {
            length : req.body.skiLength,
            type   : req.body.type
        }
        Size.find({length:search.length})
        .populate({
            path: 'skis',
            match: {
                 type: search.type,
                }
            
           })
         .exec(function (err, data) {
            if (err){
               console.log(err)  
            }            
            res.json(data);
        });
        
    }   
      
});

// @route    GET api/skis/checkout
// @desc     Get checkout products
// @access   Public
router.post('/checkout',(req,res)=>{
    var items = req.body
    let ids = req.body.map(item=>item.id);
    var checkout = {
        products:[],
        qty:0

    }
    var counter = 0
    Ski.find({_id: {$in: ids}}, function (err, products) {
        if (err) {
            // handle error
            console.log(err)
        } else {
            products.forEach(product=>{
                let sizes ={}
                items.forEach(item=>{
                    if(product._id == item.id){
                        
                        if(sizes[item.size]){
                            sizes[item.size] = sizes[item.size] +1
                            counter += 1;
                        }else{
                            sizes[item.size] = 1
                            counter += 1;
                        }
                            
                    } 
                })
               checkout.products.push({
                   product:product,
                   sizes:sizes
               }) 
            })
            checkout.qty = counter   
            res.send(checkout)
        }
    })

    
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