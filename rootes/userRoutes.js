const express = require('express');
const router = express.Router();
const UserController = require('./userController'); // Import the UserController

// Routes for user operations
router.post('/register', UserController.registerUser);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
