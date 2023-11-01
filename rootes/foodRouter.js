const express = require('express')
const  { readFoodMenu, insertIntoFoodMenu,updateFoodMenu ,deleteMenu}  = require('../controllers/foodController')
const router = express.Router();

router.get('/foodMenu',readFoodMenu)
router.post('/insertFood',insertIntoFoodMenu)
router.put('/updateMenu/:food_id',updateFoodMenu)
router.delete('/deleteMenu/:food_id',deleteMenu)


module.exports = router;