var express = require('express');
var router = express.Router();

const Razorpay = require('razorpay')

/* GET home page. */

var instance = new Razorpay({
  key_id:process.env.KEY_ID,
  key_secret:process.env.KEY_SECRET,
});



router.post('/create/orderId',(req,res)=>{
  var options = {
    amount: 4599*100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    if(err){
      res.status(500).send('something went wrong');
    }
    console.log(order);
    res.send(order);
  });

})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/payment/verify',(req,res, next) => {
  const razorpayOrderId = req.body.razorpay_order_id
  const razorpayPaymentId=req.body.razorpay_payment_id
  const signature = req.body.razorpay_signature;

  var { validatePaymentVerification } = require('./dist/utils/razorpay-utils');
 return res.send(validatePaymentVerification ({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret));

})


module.exports = router;
