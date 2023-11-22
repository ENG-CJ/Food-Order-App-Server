const e = require("express");
const db = require("../db/db.config");
const express = require("express");

module.exports = {

    readCategories: function(req,res){
        sql = "Select *from categories";
        db.getConnection.query(sql, (err,result)=> {
            if(err){
                res.send({
                    message: "Error occured on reading categories",
                    description: err.message,
                    errorCode: err.code
                })
            }
    
            return res.send({
                data: result
            })
        })
      },

  addCategory: function (req, res) {
    const {category, description} = req.body;
    var sql = "INSERT into categories(category, description) VALUES (?,?)";
    db.getConnection.query(sql, [category, description], (err, result) => {
      if (err) {
        return res.send({
          message: "Error occured on add new category!",
          description: err.message,
          errorCode: err.code,
        });
      }
      return res.send({
        data: result,
      });
    });
  },

  //Todo: => Updates category Only if the category is not in use !

  updateCategories: function (req, res) {
    const{cat_id} =req.params;
    const {category, description} = req.body;
    var sql = "Update categories set category = ?, description= ? WHERE cat_id = ?";
    
    db.getConnection.query(sql, [category, description,cat_id], (err, result)  =>{
      if (err) {
        return res.send({
          message: "There is an error occured!!",
          description: err.message,
          errorCode: err.code,
        });
      }
      return res.send({
        message: "Category  Has been updated successfully ✔",
        data: result,
      });
    });

    },
  
};
