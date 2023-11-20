const express = require('express')
const { addCategory, readCategories } = require('../controllers/categories');
const router = express.Router();

router.post('/addCategory', addCategory);
router.get('/readCategories', readCategories)


module.exports = router;