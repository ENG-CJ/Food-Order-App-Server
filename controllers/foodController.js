const db = require("../db/db.config");
const express = require("express");
const multer = require("multer");
const path= require("path")
const cr = require("crypto")

module.exports = {
  readFoodMenu: function (req, res) {
    var sql =
      "Select *from foods inner join categories on  foods.category_id = categories.cat_id where foods.status='yes'";
    db.getConnection.query(sql, (err, result) => {
      if (err) {
        return res.send({
          status: false,
          message: "There is an error occurred",
          description: err.message,
          errorCode: err.code,
        });
      }
      return res.send({
         status: true,
        data: result,
      });
    });
  },
  readFoodBasedCategories: function (req, res) {
    var sql =
      "Select *from foods inner join categories on  foods.category_id = categories.cat_id where categories.name=?";
    db.getConnection.query(sql,[req.body.category], (err, result) => {
      if (err) {
        return res.send({
          message: "There is an error occurred",
          description: err.message,
          errorCode: err.code,
        });
      }
      return res.send({
        data: result,
      });
    });
  },
  fetchSingle: function (req, res) {
    var sql =
      "Select *from foods inner join categories on  foods.category_id = categories.cat_id where foods.id=?";
    db.getConnection.query(sql, [req.params.id], (err, result) => {
      if (err) {
        return res.send({
          message: "There is an error occurred",
          description: err.message,
          errorCode: err.code,
        });
      }
      return res.send({
        data: result,
      });
    });
  },
  uploadFoodImage: (req, res) => {
    var multerStg = multer.diskStorage({
      destination: "./public/uploads",
      filename: (req, file, cb) => {
        cb(null, `${cr.randomUUID()}${path.extname(file.originalname)}`);
      },
    });

    const uploader = multer({
      storage: multerStg,
    });
    return uploader;
  },
  active: (req, res) => {
    const { status, id } = req.body;
    var sql = "UPDATE foods SET status=? WHERE id=?";

    db.getConnection.query(sql, [status, id], (error, data) => {
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred while reading",
          description: error.message,
          error_code: error.code,
        });

      return res.send({
        status: true,
        message: "order status Has been updated successfully ✔",
      });
    });
  },
  insertIntoFoodMenu: function (req, res) {
    const { name, price, category_id } = req.body;
    var sql =
      "Insert into foods (food_name, price, category_id, image, status) VALUE (?,?,?,?,?)";
    db.getConnection.query(
      sql,
      [name, price, category_id, req.file.filename, "yes"],
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
          message: "Food " + name + " Successfully Created",
        });
      }
    );
  },
  updateFoodMenu: function (req, res) {
    const { id } = req.params;
    const { name, price, category_id, default_image } = req.body;

    var sql =
      "Update foods set food_name = ?, price = ?, category_id = ?, image = ? WHERE id = ?";
    db.getConnection.query(
      sql,
      [
        name,
        price,
        category_id,
        req.file ? req.file.filename : default_image,
        id,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "There is an error occurred!",
            description: err.message,
            errorCode: err.code,
          });
        }

        return res.send({
          data: result,
          message: "menu have been updated",
        });
      }
    );
  },

  deleteMenu: function (req, res) {
    const { food_id } = req.params;
    var sql = "Delete FROM foods where id= ?";
    db.getConnection.query(sql, [food_id], (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "There is an error occured!",
          description: error.message,
          errorCode: error.code,
        });
      }
      return res.send({
        data: result,
        message: `You have successfully deleted data with the ID: ${food_id}`,
      });
    });
  },
};
