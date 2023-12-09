const db = require("../db/db.config");
const express = require("express");

module.exports = {
  readFoodMenu: function (req, res) {
    var sql = "Select *from food_menu";
    db.getConnection.query(sql, (err, result) => {
      if (err) {
        return res.send({
          message: "There is an error occurred",
          description: err.message,
          errorCode: err.code,
        });
      }
      return res.send({
        requests: result,
      });
    });
  },
  insertIntoFoodMenu: function (req, res) {
    const { name, price, category, image, isAvailable } = req.body;
    var sql ="Insert into food_menu (name, price, category, image, isAvailable) VALUE (?,?,?,?,?)";
    db.getConnection.query(
      sql,
      [name, price, category, image, isAvailable],
      (err, result) => {
        if (err) {
          return res.send({
            message: "There is an error occured!",
            description: err.message,
            errorCode: err.code,
          });
        }

        return res.send({
          data: result,
        });
      }
    );
  },
  updateFoodMenu: function(req,res) {
    const { food_id } = req.params;
    const { name, price, category, image, isAvailable } = req.body;
    var sql = "Update food_menu set name = ?, price = ?, category = ?, image = ?, isAvailable = ? WHERE food_id = ?";
    db.getConnection.query(sql,[name, price, category, image, isAvailable,food_id], (err,result) => {
        if(err){
            return res.status(500).json({
                message: "There is an error occurred!",
                description: err.message,
                errorCode: err.code
            })
        }

        return res.send({
            data: result,
            message: "Your menu have been updated"
        })
    })
  },

  deleteMenu: function(req,res) {
    const { food_id } = req.params;
    var sql = "Delete from food_menu where food_id= ?"
    db.getConnection.query(sql,[food_id],(error,result) => {
        if(error){
            return res.status(500).json({
                message: "There is an error occured!",
                description: error.message,
                errorCode: error.code
            })
        }
        return res.send({
            data: result,
            message: `You have successfully deleted data with the ID: ${food_id}`
        })
    })
  }
};
