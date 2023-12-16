const db = require("../db/db.config"); // Import the MySQL connection

const UserController = {
  registerUser: (req, res) => {
    const { username, email, password } = req.body;
console.log(username);
    const sql =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    console.log(req.body);

    db.getConnection.query(sql, [username, email, password], (err, result) => {
      if (err) {
        res.send({message: "Error registering user",status: false, description: err.message});
        return;
      }
      res.send({ status: true, message: "User registered successfully" });
    });
  },

  fetchUser: (req, res) => {
    const { email, pass } = req.params;

    const sql = "SELECT * FROM users WHERE email = ? and password=?";
    db.getConnection.query(sql, [email, pass], (err, result) => {
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
  validateUser: (req, res) => {
    const { email, username } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? OR username=?";
    db.getConnection.query(sql, [email, username], (err, result) => {
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

  exists: (req, res) => {
    const { email, mobile } = req.body;

    const sql = "SELECT * FROM customers WHERE email = ? OR mobile= ?";
    db.getConnection.query(sql, [email, mobile], (err, result) => {
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
  getProfile: (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM users WHERE id = ?";
    db.getConnection.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error fetching user: ", err);
        res.status(500).send("Error fetching user");
        return;
      }

      return res.send({ data: result });
    });
  },
  readUsers: (req, res) => {
    const userId = req.params.id;

    const sql = "SELECT * FROM users";
    db.getConnection.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching user: ", err);
        res.status(500).send("Error fetching user");
        return;
      }
      res.send({ data: result });
    });
  },

  updateUser: (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    const sql = "UPDATE Users SET username=?, email=?, password=? WHERE id=?";
    db.getConnection.query(
      sql,
      [username, email, password, userId],
      (err, result) => {
        if (err) {
          console.error("Error updating user: ", err);
          res.status(500).send("Error updating user");
          return;
        }
        res.status(200).send("User updated successfully");
      }
    );
  },
  updateProfile: (req, res) => {
    const { username, email,password, user_id } = req.body;
console.log(req.body);
    const sql = "UPDATE users SET username=?, email=?, password=? WHERE id=?";
    db.getConnection.query(
      sql,
      [username, email, password, user_id],
      (err, result) => {
        if (err) {
          console.error("Error updating user: ", err);
          res.status(500).send("Error updating user");
          return;
        }

        return res.send({ message: "profile updated successfully" });
      }
    );
  },

  deleteUser: (req, res) => {
    const userId = req.params.id;

    const sql = "DELETE FROM Users WHERE id = ?";
    db.getConnection.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error deleting user: ", err);
        res.status(500).send("Error deleting user");
        return;
      }
      res.send({ message: "User deleted successfully", status: true });
    });
  },
};

module.exports = UserController;
