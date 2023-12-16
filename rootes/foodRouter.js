const express = require('express')
const  { readFoodMenu, insertIntoFoodMenu,updateFoodMenu ,deleteMenu, uploadFoodImage, active, fetchSingle, readFoodBasedCategories, checkFoodName}  = require('../controllers/foodController')
const router = express.Router();

router.get('/',readFoodMenu)
router.get('/:id',fetchSingle)
router.post('/specificCategories',readFoodBasedCategories)
router.post("/checkFoodName", checkFoodName);
router.post('/create',uploadFoodImage().single("image"),insertIntoFoodMenu)
router.put('/update/:id',uploadFoodImage().single("image"),updateFoodMenu)
router.post('/updateStatus',active)
router.delete('/:food_id',deleteMenu)


module.exports = router;