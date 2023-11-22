const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/userController'); // Import the UserController

// Routes for user operations
userRouter.post('/register', UserController.registerUser);
userRouter.get("/:email/:pass", UserController.fetchUser);
userRouter.get('/', UserController.readUsers);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

module.exports = userRouter;
