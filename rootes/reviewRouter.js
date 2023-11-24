const express=require('express');
const {readReview,insertReview,updateReview,deleteReview}=require('../controllers/review');
const router=express.Router();

router.get('/readreview',readReview);
router.post('/insertreview',insertReview);
router.put('/updatereview/:review_id',updateReview);
router.delete('/deletereview/:review_id',deleteReview);


module.exports=router;