import express from 'express';
import UserController from '../controller/userController.js';
const authRouter = express.Router();

authRouter.post('/register', UserController.CreateUser);
export default authRouter;
