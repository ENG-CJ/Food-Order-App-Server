const conn = require("../db/db.config");

module.exports = {
  readOrders: (req, res) => {
    var sql =
      "SELECT * FROM `orders` JOIN customers ON orders.cust_id=customers.cust_id JOIN foods ON orders.food_id=foods.id";
    conn.getConnection.query(sql, (error, data) => {
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred while reading",
          description: error.message,
          error_code: error.code,
        });
      console.log();
      return res.send({
        status: true,
        data: data,
      });
    });
  },
  readOrdersForSpecificCustomer: (req, res) => {
    var sql =
      "SELECT foods.food_name, categories.name as category, orders.order_status FROM `orders` JOIN foods ON orders.food_id=foods.id JOIN categories ON foods.category_id=categories.cat_id WHERE orders.cust_id=? ORDER BY orders.order_date DESC LIMIT 100";
    conn.getConnection.query(sql, [req.params.id],(error, data) => {
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred while reading",
          description: error.message,
          error_code: error.code,
        });
      console.log();
      return res.send({
        
        status: true,
        data: data,
      });
    });
  },
  readSinglePrintableData: (req, res) => {
    console.log(req.params.id);
    var sql = "CALL readSinglePrintableData(?)";
    conn.getConnection.query(sql, [req.params.id], (error, data) => {
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred while reading",
          description: error.message,
          error_code: error.code,
        });
      console.log();
      return res.send({
        status: true,
        data: data,
      });
    });
  },
  printAllData: (req, res) => {
    console.log("the is", req.params.id);
    var sql = "CALL printAllData()";
    conn.getConnection.query(sql, (error, data) => {
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred while reading",
          description: error.message,
          error_code: error.code,
        });
      console.log();
      return res.send({
        status: true,
        data: data[0],
      });
    });
  },
  readOrderData: (req, res) => {
    var sql =
      "SELECT * FROM `orders` JOIN customers ON orders.cust_id=customers.cust_id JOIN foods ON orders.food_id=foods.id where order_id=?";
    conn.getConnection.query(sql, [req.params.id], (error, data) => {
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred while reading",
          description: error.message,
          error_code: error.code,
        });
      console.log();
      return res.send({
        status: true,
        data: data,
      });
    });
  },
  active: (req, res) => {
    const { status, id } = req.body;
    var sql = "UPDATE orders SET order_status=? WHERE order_id=?";
    console.log(req.body);
    conn.getConnection.query(sql, [status, id], (error, data) => {
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
  placeOrder: async (req, res) => {
    var sql =
      "INSERT INTO orders (cust_id,food_id,quantity,total_amount,order_date, order_status) VALUES (?)";
    try {
      for (const value of req.body) {
        await new Promise((resolve, reject) => {
          conn.getConnection.query(
            sql,
            [
              [
                value.custID,
                value.food_id,
                value.quantity,
                value.total_amount,
                value.order_date,
                "pending",
              ],
            ],
            (error, data) => {
              if (error) {
                reject(error);
              } else {
                resolve(data);
              }
            }
          );
        });
      }

      res.send({ message: "Order Placed successfully", status: true });
    } catch (error) {
      res.send({
        description:
          "Error occurred while processing Your order, Please Try Again",
        status: false,
      });
    }

    // req.body.forEach((value) => {
    //  try {
    //    conn.getConnection.query(
    //      sql,
    //      [
    //        [
    //          value.custID,
    //          value.food_id,
    //          value.quantity,
    //          value.total_amount,
    //          value.order_date,
    //          "pending",
    //        ],
    //      ],
    //      (error, data) => {
    //       if(error)
    //        console.log("err")
    //      }
    //    );
    //  } catch (error) {
    //   console.log("error ", error)
    //  }
    // });

    // console.log("before ")
    // if(!hasError)
    //     {
    //       console.log("Sent")
    //       return res.send({
    //        status: true,
    //        message: "order Has been placed ✔",
    //      });}
    //  if (error) {
    //    hasError = true;
    //    return res.send({
    //      status: false,
    //      message: "Error Occurred while reading",
    //      description: error.message,
    //      error_code: error.code,
    //    });
    //  }
  },

  updateOrderFromClient: (req, res) => {
    const { quantity, delivery_amount, total_amount, status } = req.body;
    var sql =
      "UPDATE orders SET quantity=?,delivery_amount=?,total_amount=?,status=? WHERE order_id=?";
    var values = [
      quantity,
      delivery_amount,
      total_amount,
      status,
      req.params.id,
    ];
    conn.getConnection.query(sql, values, (error, data) => {
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred while reading",
          description: error.message,
          error_code: error.code,
        });

      return res.send({
        status: true,
        message: "Order Has been updated successfully ✔",
      });
    });
  },

  removeOrder: (req, res) => {
    conn.getConnection.query(
      "DELETE FROM orders WHERE order_id=?",
      [req.params.id],
      (error, data) => {
        if (error)
          return res.send({
            status: false,
            message: "Error Occurred while reading",
            description: error.message,
            error_code: error.code,
          });

        return res.send({
          status: true,
          message: "Order Has been Removed successfully ✔",
        });
      }
    );
  },
  statusApproval: (req, res) => {
    conn.getConnection.query(
      "UPDATE orders set status=? WHERE order_id=?",
      [req.body.status, req.params.id],
      (err, data) => {
        if (err)
          return res.send({
            status: false,
            message: "Error Occurred while updating",
            description: err.message,
            error_code: err.code,
          });

        return res.send({
          status: true,
          message: `Order Has been Changed to ${req.body.status} successfully ✔`,
        });
      }
    );
  },
};
