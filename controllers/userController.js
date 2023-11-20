const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set your upload directory
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage }).single('profile_image');

const db = require('./database'); // Import the MySQL connection

const UserController = {
  registerUser: (req, res) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        console.error('Error uploading image: ', err);
        res.status(500).send('Error uploading image');
        return;
      } else if (err) {
        // An unknown error occurred when uploading
        console.error('Unknown error uploading image: ', err);
        res.status(500).send('Unknown error uploading image');
        return;
      }

      // Multer successfully uploaded the image
      const { username, email, password } = req.body;
      const profile_image = req.file ? req.file.filename : null; // Get uploaded file name

      const sql = 'INSERT INTO Users (username, email, password, profile_image) VALUES (?, ?, ?, ?)';
      db.query(sql, [username, email, password, profile_image], (err, result) => {
        if (err) {
          console.error('Error registering user: ', err);
          res.status(500).send('Error registering user');
          return;
        }
        res.status(201).send('User registered successfully');
      });
    });
  },

  getUserById: (req, res) => {
    const userId = req.params.id;

    const sql = 'SELECT * FROM Users WHERE id = ?';
    db.query(sql, userId, (err, result) => {
      if (err) {
        console.error('Error fetching user: ', err);
        res.status(500).send('Error fetching user');
        return;
      }
      res.status(200).json(result);
    });
  },

  updateUser: (req, res) => {
    const userId = req.params.id;
    const { username, email, password, profile_image } = req.body;

    const sql = 'UPDATE Users SET username=?, email=?, password=?, profile_image=? WHERE id=?';
    db.query(sql, [username, email, password, profile_image, userId], (err, result) => {
      if (err) {
        console.error('Error updating user: ', err);
        res.status(500).send('Error updating user');
        return;
      }
      res.status(200).send('User updated successfully');
    });
  },

  deleteUser: (req, res) => {
    const userId = req.params.id;

    const sql = 'DELETE FROM Users WHERE id = ?';
    db.query(sql, userId, (err, result) => {
      if (err) {
        console.error('Error deleting user: ', err);
        res.status(500).send('Error deleting user');
        return;
      }
      res.status(200).send('User deleted successfully');
    });
  }
};

module.exports = UserController;
