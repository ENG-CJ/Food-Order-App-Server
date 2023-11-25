const db = require("../db/db.config");
const express = require("express");

module.exports = {
  readPayments: function (req, res) {
    var sql = "select * from payments";
    db.getConnection.query(sql, (err, result) => {
      if (err) {
        return res.send({
          message: "there is an error connection",
          description: err.message,
        });
      }
      return res.send({
        data: result,
      });
    });
  },
  insertpayment: function(req,res){
    const {	pay_id	,order_id,cust_id,amount,paid_date,approve_transaction}=req.body;
    var sql ="INSERT INTO payments (pay_id	,order_id,cust_id,amount,paid_date,approve_transaction) value(?,?,?,?,?,?)";
    db.getConnection.query(sql,[pay_id	,order_id,cust_id,amount,paid_date,approve_transaction],(err,result)=>{
      if(err){
       return res.send(
          {message:"there is an error in the databse",
          error:err.message
          }
        )
      }
      return res.send({
        data:"successfully inserted"
      })
    })
  },
  updatepayment: function(req,res){
    const{order_id,cust_id,amount,paid_date,approve_transaction}=req.body;
    const { pay_id }=req.params;
     var sql="update payments set order_id=?,cust_id=?,amount=?,paid_date=?,approve_transaction=? where pay_id=?";
     db.getConnection.query(sql,[order_id,cust_id,amount,paid_date,approve_transaction,pay_id],(err,result)=>{
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
  deletepayment: function(req,res){
    const {pay_id}=req.params;
    var sql="delete from payments where pay_id=?";
    db.getConnection.query(sql,[pay_id],(err,result)=>{
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

};
