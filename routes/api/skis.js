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

// @route    POST api/families
// @desc     Add a new family
// @access   Public
/*router.post('/',(req,res)=>{

    const newFamily = new Family({
        familyName  : req.body.familyName,
        familyCode  : req.body.familyCode,
        admin       : req.body.admin,
        members     : req.body.members.map(member =>(
            {
                name         : member.name,
                email        : member.email,
                personalCode : member.personalCode
            } 
        ))    
    })
    newFamily.save()
        .then(family=>res.json(family))
        .catch((err)=> console.log(err))
});
*/


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