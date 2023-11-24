// const express = require('express');
// const  { readPayments}  = require('../controllers/payments.js');
// const router = express.Router();

// router.get('/readPayment',readPayments)



// module.exports = router;
const express = require('express')
const {readPayments,insertpayment,updatepayment,deletepayment}=require('../controllers/payments')
const router = express.Router();

router.get('/readpayment',readPayments)
router.post('/insertpayment',insertpayment)
router.put('/updatepayment/:pay_id',updatepayment)
router.delete('/deletepayment/:pay_id',deletepayment)

module.exports = router;