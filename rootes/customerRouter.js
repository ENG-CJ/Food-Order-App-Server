const express= require('express');
const { readCustomers, createCustomer, updateCustomer, deleteCustomer, active, fetchCustomer, fetchSingle, updatePass, fetchEmailData } = require('../controllers/customers');

const router = express.Router();

router.post('/activate',active);
router.get('/',readCustomers);
router.get('/:id',fetchSingle);
router.get('/:email/:pass',fetchCustomer);
router.post('/',createCustomer);
router.post("/updatePass", updatePass);
router.post("/updateFromClient", updateCustomer);
router.post("/validateEmail", fetchEmailData);
// router.put('/updateCustomer/:id',updateCustomer);
router.delete('/deleteCustomer/:id',deleteCustomer);


module.exports = router;
