const express = require('express');
const router  = express.Router();
const paypal       = require('paypal-rest-sdk');




// @route    POST api/pay
// @desc     create payment
// @access   Public
router.post('/',(req,res)=>{
    
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                
            },
            "amount": {
                "currency": "USD",
                "total": req.body.tp/10
            },
            "description": "Hat for the best team ever"
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        payment.links.forEach(link=>{
        if(link.rel === 'approval_url' ){
            res.redirect(link.href)
        }
        })  
    }
    });

});


  
router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
});







module.exports = router