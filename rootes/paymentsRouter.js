// module.exports = router;
const express = require('express')
const {readPayments,insertpayment,updatepayment, updateStatus, deletePayment}=require('../controllers/payments')
const router = express.Router();

router.get('/',readPayments)
router.post('/insertpayment',insertpayment)
router.post("/updateStatus", updateStatus);
router.delete("/:pay_id", deletePayment);

module.exports = router;