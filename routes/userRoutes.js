import express from 'express';
const userRouter = express.Router();
import UserController from '../controller/userController.js';

userRouter.get('/all_users', UserController.getAllUsers);

export default userRouter;
