const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/userController'); // Import the UserController

// Routes for user operations
userRouter.post('/register', UserController.registerUser);
userRouter.post("/findEmail", UserController.findEmail);
userRouter.post("/updateUserPass", UserController.updateUserPass);
userRouter.post("/validateUser", UserController.validateUser);
userRouter.post("/profile_update", UserController.updateProfile);
userRouter.post("/exists", UserController.exists);
userRouter.get('/', UserController.readUsers);
userRouter.get("/profile/:id", UserController.getProfile);
userRouter.get("/:email/:pass", UserController.fetchUser);
userRouter.put('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

module.exports = userRouter;
