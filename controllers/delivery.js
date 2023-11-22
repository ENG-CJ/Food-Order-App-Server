const conn = require("../db/db.config");





module.exports = {
    getDelivery: function(req, res){
    conn.getConnection.query("SELECT * FROM delivery", (error, data) => {
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
  
  
  addDelivery: function(req, res){
    const { del_id, cust_id, location, district, generated_at} = req.body;

    const sql = "INSERT INTO delivery (del_id,cust_id,location,district,generated_at) VALUES (?, ?, ?,?,?)";
        
    const dataAdded = [del_id,cust_id,location,district,generated_at];

    conn.getConnection.query(sql, dataAdded, (error, data) => {
      console.log("value ",data);
      console.log("Data ",dataAdded);
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred while reading",
          description: error.message,
          error_code: error.code,
        });

      return res.send({
        status: true,
        message: "Delivery added Success",
        data:add
      });
    });
  },
  
  



  
  updateDelivery: (req, res) => {
    const { del_id, cust_id, location, district, generated_at} = req.body;
    console.log("del_id : ",del_id);
    console.log("Cust_id : ",cust_id);
    console.log("location : ", location);
    console.log("distrct : ",district);
    console.log("generated : ", generated_at);
      
    const sql = "UPDATE delivery SET cust_id=?, location=?, district=?, generated_at=?  WHERE del_id=?";

    
    const dataChanges = [cust_id,location,district,generated_at,del_id];
    console.log("DataChanges ",dataChanges);
    conn.getConnection.query(sql, dataChanges, (error, data) => {
      console.log("Data :", data)
      if (error)
        return res.send({
          status: false,
          message: "Error Occurred reading",
          description: error.message,
          error_code: error.code,
        });

      return res.send({
        status: true,
        message: "Delivery updated Success",
      });
    });
  },


  
  deleteDelivery: (req, res) => {
    console.log("Id ",[req.body.del_id],)
    const sql = "DELETE from delivery WHERE del_id=?";
    const dataDeleted = [req.body.del_id];
    conn.getConnection.query(
      sql,
      dataDeleted,
      (error, data) => {
        console.log("Data ",data);
        if (error)
          return res.send({
            status: false,
            message: "Error Occurred reading",
            description: error.message,
            error_code: error.code,
          });

        return res.send({
          status: true,
          message: "delivery deleted Success",
        });
      }
    );
  },
};