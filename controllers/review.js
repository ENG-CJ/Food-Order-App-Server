const db=require('../db/db.config');
const express=require('express');

module.exports={
   readReview: function(req,res){
     var sql="select * from review_ratings";
     db.getConnection.query(sql,(err,result)=>{
        if(err){
            return res.send({
                message:"there is an error in the databse query",
                description:err.message,
            });
        }
        return res.send({
            data:result,
        });
     })


   },
   insertReview: function(req,res){
    const {review,food_id}=req.body;
    var sql="insert into review_ratings(review,food_id) value(?,?) ";
    db.getConnection.query(sql,[review,food_id],(err,result)=>{
        if(err){
            return res.send({
                message:"there is an error in the database",
                description:err.message
            })
        }
        return res.send({
            data:"successfully inserted"
        })
    })
   },
   updateReview: function(req,res){
    const{review,food_id}=req.body;
    const { review_id }=req.params;
     var sql="update review_ratings set review=?,food_id=? where review_id=?";
     db.getConnection.query(sql,[review,food_id,review_id],(err,result)=>{
      if(err){
        return res.send({
          message:"there is an error in the database",
          error:err.message
        })
      }
      return res.send({
        data:"succesfully updated"
      })
     })
  },
  deleteReview: function(req,res){
    const {review_id}=req.params;
    var sql="delete from review_ratings where review_id=?";
    db.getConnection.query(sql,[review_id],(err,result)=>{
      if(err){
        res.send({
          message:"there is an error in the database",
          error:err.message
        })
      }
      return res.send({
        data:"successfully deleted"
      })
    })
  }

}
