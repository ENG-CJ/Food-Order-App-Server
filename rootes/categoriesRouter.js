const express = require('express')
const { addCategory, readCategories,updateCategories, deleteCategory, fetchSingle } = require('../controllers/categories');
const router = express.Router();

router.post('/addCategory', addCategory);

router.get('/', readCategories)
router.get('/:id', fetchSingle)
router.delete('/:id', deleteCategory)
router.post("/updateCategory", updateCategories);


module.exports = router;