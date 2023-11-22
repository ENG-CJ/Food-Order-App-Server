const express= require('express');
const router = express.Router();
const read = require('../controllers/delivery');

router.get('/',read.getDelivery);
router.post('/addDelivery',read.addDelivery);
router.put('/updateDelivery',read.updateDelivery);
router.delete('/deleteDelivery',read.deleteDelivery);



module.exports = router;