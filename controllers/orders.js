const conn = require("../db/db.config");

module.exports = {
  readOrders: (req, res) => {
    conn.getConnection.query("SELECT * FROM orders", (error, data) => {
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred while reading",
          description: error.message,
          error_code: error.code,
        });

      return res.send({
        status: true,
        data: data,
      });
    });
  },
  placeOrder: (req, res) => {
    const {
      customer_id,
      food_id,
      quantity,
      delivery_amount,
      total_amount,
      order_date,
      status,
    } = req.body;
    var sql =
      "INSERT INTO orders (cust_id,food_id,quantity,delivery_amount,total_amount,order_date, status) VALUES (?, ?, ?,?,?,?,?)";
    var values = [
      customer_id,
      food_id,
      quantity,
      delivery_amount,
      total_amount,
      order_date,
      status,
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
        message: "order Has been placed ✔",
      });
    });
  },
  updateOrderFromClient: (req, res) => {
    const {
      quantity,
      delivery_amount,
      total_amount,
      status
    } = req.body;
    var sql =
      "UPDATE orders SET quantity=?,delivery_amount=?,total_amount=?,status=? WHERE order_id=?";
    var values = [quantity, delivery_amount, total_amount, status,req.params.id];
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
      "DELETE orders WHERE order_id=?",
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
  statusApproval : (req,res)=>{
    conn.getConnection.query("UPDATE orders set status=? WHERE order_id=?",
    [req.body.status,req.params.id],(err,data)=>{
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
    })
  }
};
