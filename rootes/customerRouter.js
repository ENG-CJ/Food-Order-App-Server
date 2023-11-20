const express= require('express');
const { readCustomers, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customers');
const router = express.Router();

router.get('/',readCustomers);
router.get('/createCustomer',createCustomer);
router.get('/updateCustomer',updateCustomer);
router.get('/deleteCustomer',deleteCustomer);

module.exports = router;
