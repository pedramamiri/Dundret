const express = require('express');
const router  = express.Router();

//skis model 
const Ski = require('../../models/Ski');


// @route    GET api/skis
// @desc     Get all skis
// @access   Public
router.get('/',(req,res)=>{
    Ski.find()
        .sort({name: 1})
        .then(skis=>res.json(skis))
});

// @route    POST api/skis
// @desc     Add a new ski
// @access   Public
router.post('/',(req,res)=>{

    const newSki = new Ski({
        name    : req.body.name,
        model   : req.body.model,
        price   : req.body.price,
        image   : req.body.image,
        type    : req.body.type,
        desc    : req.body.desc,
        sizes   : req.body.sizes.map(size =>(
            {
                length      : size.length,
                qty         : size.qty,
            } 
        ))    
    })
    newSki.save()
        .then(ski=>res.json(ski))
        .catch((err)=> console.log(err))
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