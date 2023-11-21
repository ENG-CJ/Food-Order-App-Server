const express = require('express')
const { addCategory, readCategories,updateCategories } = require('../controllers/categories');
const router = express.Router();

router.post('/addCategory', addCategory);
router.get('/readCategories', readCategories)
router.put('/updateCategories/:cat_id', updateCategories)


module.exports = router;