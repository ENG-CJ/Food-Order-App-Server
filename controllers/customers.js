const conn = require("../db/db.config");
module.exports = {
  readCustomers: (req, res) => {
    conn.getConnection.query("SELECT * FROM customers", (error, data) => {
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
  createCustomer: (req, res) => {
    const {
      fullName,
      mobile,
      email,
      password,
      address,
      account_state,
      profile_image,
    } = req.body;
    var sql =
      "INSERT INTO customers (fullName,mobile,email,password,address,account_state, profile_image) VALUES (?, ?, ?,?,?,?,?)";
    var values = [
      fullName,
      mobile,
      email,
      password,
      address,
      account_state,
      profile_image,
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
        message: "Customer Has been added successfully ✔",
      });
    });
  },
  updateCustomer: (req, res) => {
    const {
      
      fullName,
      mobile,
      email,
      password,
      address,
      account_state,
      profile_image,
    } = req.body;
    var sql =
      "UPDATE customers SET fullName=?,mobile=?,email=?,password=?,address=?,account_state=?, profile_image=? WHERE cust_id=?";
    var values = [
      fullName,
      mobile,
      email,
      password,
      address,
      account_state,
      profile_image,
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
        message: "Profile Has been updated successfully ✔",
      });
    });
  },

  deleteCustomer: (req, res) => {
    conn.getConnection.query(
      "DELETE customers WHERE cust_id=?",
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
          message: "Customer Has been deleted successfully ✔",
        });
      }
    );
  },
};
