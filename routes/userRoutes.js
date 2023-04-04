import express from 'express';
import UserController from '../controller/userController.js';
import SecureRoute from '../middleware/secureRoute.js';
import UserAuthValidator from '../middleware/UserAuthValidator.js';

const userRouter = express.Router();

// return all users
userRouter.get('/all_users', UserController.getAllUsers);

// get a user's profile
userRouter.get(
  '/user/profile',
  SecureRoute.loginRequired,
  UserController.getOneUser
);

// edit user profile
userRouter.put(
  '/user/profile/put',
  SecureRoute.loginRequired,
  UserAuthValidator.validateCreateUser,
  UserController.updateUser
);

export default userRouter;
