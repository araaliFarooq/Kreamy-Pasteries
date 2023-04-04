import express from 'express';
import UserController from '../controller/userController.js';
import UserAuthValidator from '../middleware/UserAuthValidator.js';
const authRouter = express.Router();

authRouter.post(
  '/register',
  UserAuthValidator.validateCreateUser,
  UserController.RegisterUser
);
authRouter.post(
  '/login',
  UserAuthValidator.validateUserLogin,
  UserController.LoginUser
);

export default authRouter;
