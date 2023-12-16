const e = require("express");
const db = require("../db/db.config");
const express = require("express");

module.exports = {
  readCategories: function (req, res) {
    sql = "Select *from categories";
    db.getConnection.query(sql, (err, result) => {
      if (err) {
        res.send({
          message: "Error occured on reading categories",
          description: err.message,
          errorCode: err.code,
        });
      }

      return res.send({
        data: result,
      });
    });
  },
  checkCategory: function (req, res) {
    sql = "Select *from categories where name=?";
    db.getConnection.query(sql, [req.body.name], (err, result) => {
      if (err) {
        res.send({
          status: false,
          message: "Error occured on reading categories",
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
  fetchSingle: function (req, res) {
    sql = "Select *from categories where cat_id=?";
    db.getConnection.query(sql, [req.params.id], (err, result) => {
      if (err) {
        res.send({
          message: "Error occured on reading categories",
          description: err.message,
          errorCode: err.code,
        });
      }

      return res.send({
        data: result,
      });
    });
  },
  deleteCategory: function (req, res) {
    sql = "DELETE FROM categories where cat_id=?";
    db.getConnection.query(sql, [req.params.id], (err, result) => {
      if (err) {
        res.send({
          status: false,
          message: "Error occured on reading categories",
          description: err.message,
          errorCode: err.code,
        });
      }

      return res.send({
        status: true,
        message:
          "Category That has an id " +
          req.params.id +
          " Was deleted successfully",
        data: result,
      });
    });
  },

  addCategory: function (req, res) {
    const { name, description } = req.body;
    var sql = "INSERT into categories(name, description) VALUES (?,?)";
    db.getConnection.query(sql, [name, description], (err, result) => {
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
    const { name, description, id } = req.body;
    var sql = "Update categories set name = ?, description= ? WHERE cat_id = ?";

    db.getConnection.query(sql, [name, description, id], (err, result) => {
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
