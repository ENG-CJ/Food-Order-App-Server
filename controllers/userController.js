const multer = require('multer');
const path = require('path');
const cr= require('crypto')


const storage = multer.diskStorage({
  destination:  './public/uploads/'
  ,
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${cr.randomUUID()}${ext}`);
  }
});

const upload = multer({ storage: storage }).single('profile_image');

const db = require('../db/db.config'); // Import the MySQL connection

const UserController = {
  registerUser: (req, res) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        console.error("Error uploading image: ", err);
        res.status(500).send("Error uploading image");
        return;
      } else if (err) {
        // An unknown error occurred when uploading
        console.error("Unknown error uploading image: ", err);
        res.status(500).send("Unknown error uploading image");
        return;
      }

      // Multer successfully uploaded the image
      const { username, email, password } = req.body;
      const profile_image = req.file ? req.file.filename : "no_profile"; // Get uploaded file name

      const sql =
        "INSERT INTO users (username, email, password, profile_image) VALUES (?, ?, ?, ?)";
      console.log(req.body);

      db.getConnection.query(
        sql,
        [username, email, password, profile_image],
        (err, result) => {
          if (err) {
            console.error("Error registering user: ", err);
            res.status(500).send("Error registering user");
            return;
          }
          res.send({ status: true, message: "User registered successfully" });
        }
      );
    });
  },

  fetchUser: (req, res) => {
    const { email, pass } = req.params;

    const sql = "SELECT * FROM users WHERE email = ? and password=?";
    db.getConnection.query(sql, [email, pass], (err, result) => {
      if (err) {
        console.error("Error fetching user: ", err);
        res.status(500).send("Error fetching user");
        return;
      }
      res.send({ data: result,});
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
      console.log("id is ",id)
      return res.send({ data: result, });
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
    const { username, email, password, profile_image } = req.body;

    const sql =
      "UPDATE Users SET username=?, email=?, password=?, profile_image=? WHERE id=?";
    db.getConnection.query(
      sql,
      [username, email, password, profile_image, userId],
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
