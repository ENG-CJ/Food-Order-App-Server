const express = require('express')
const { addCategory, readCategories,updateCategories, deleteCategory, fetchSingle, checkCategory } = require('../controllers/categories');
const router = express.Router();

router.post('/addCategory', addCategory);
router.post("/checkCategory", checkCategory);

router.get('/', readCategories)
router.get('/:id', fetchSingle)
router.delete('/:id', deleteCategory)
router.post("/updateCategory", updateCategories);


module.exports = router;