const express= require('express');
const { readCustomers, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customers');
const router = express.Router();

router.get('/',readCustomers);
router.post('/createCustomer',createCustomer);
router.put('/updateCustomer/:id',updateCustomer);
router.delete('/deleteCustomer/:id',deleteCustomer);

module.exports = router;
