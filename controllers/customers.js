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
  fetchSingle: (req, res) => {
    conn.getConnection.query(
      "SELECT * FROM customers where cust_id=?",
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
          data: data,
        });
      }
    );
  },
  createCustomer: (req, res) => {
    const { name, mobile, email, password, address, status } = req.body;
    console.log(req.body);
   var sql = "INSERT INTO customers(fullName,mobile,email,password ,address, account_status) VALUES(?,?,?,?,?,?)";
   conn.getConnection.query(sql,[name,mobile,email,password,address,status],(error)=>{
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
  fetchCustomer: (req, res) => {
    const { email, pass } = req.params;
    console.log(email, pass);

    const sql = "SELECT * FROM customers WHERE email = ? and password=?";
    conn.getConnection.query(sql, [email, pass], (err, result) => {
      if (err) {
        res.send({
          status: false,
          message: "Error fetching user",
          description: err.message,
        });
        return;
      }
      res.send({ data: result, status: true });
    });
  },
  fetchEmailData: (req, res) => {
    const { email } = req.body;


    const sql = "SELECT * FROM customers WHERE email = ?";
    conn.getConnection.query(sql, [email], (err, result) => {
      if (err) {
        res.send({
          status: false,
          message: "Error fetching user",
          description: err.message,
        });
        return;
      }
      res.send({ data: result, status: true });
    });
  },
  updateCustomer: (req, res) => {
    const { name, mobile, email, address, id } = req.body;
    var sql =
      "UPDATE customers SET fullName=?,mobile=?,email=?,address=? WHERE cust_id=?";
    var values = [name, mobile, email, address, id];
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
  updatePass: (req, res) => {
    const { pass, id ,email} = req.body;
    if(email){
          var sql = "UPDATE customers SET password=? WHERE email=?";
          var values = [pass, email];
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
              message: "password Has been updated successfully ✔",
            });
          });
    }else{
          var sql = "UPDATE customers SET password=? WHERE cust_id=?";
          var values = [pass, id];
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
              message: "password Has been updated successfully ✔",
            });
          });
    }

  },
  active: (req, res) => {
    const { status, id } = req.body;
    var sql = "UPDATE customers SET account_status=? WHERE cust_id=?";
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
        message: "customer status Has been updated successfully ✔",
      });
    });
  },
  deleteCustomer: (req, res) => {
    conn.getConnection.query(
      "DELETE FROM customers WHERE cust_id=?",
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
