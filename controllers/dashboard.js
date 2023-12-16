const conn = require("../db/db.config");

module.exports = {
  countAllRows: function (req, res) {
    const {table}=req.params;
    conn.getConnection.query("SELECT count(*) as row FROM "+table, (error, data) => {
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred while reading",
          description: error.message,
          error_code: error.code,
        });

      return res.send({
        status: true,
        data: data[0],
      });
    });
  },
  countPendingOrders: function (req, res) {
    const {table}=req.params;
    conn.getConnection.query(
      "SELECT count(*) as row FROM " +
        table +
        " where order_status='pending' OR order_status='Pending'",
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
          data: data[0],
        });
      }
    );
  },
};
