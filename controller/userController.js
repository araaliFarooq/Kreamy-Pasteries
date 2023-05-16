import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import TokenHandler from '../helpers/tokenHandler.js';
import UserServices from '../services/userServices.js';
import validateMongoDbId from '../helpers/userHelper.js';


export default class UserController {
  /**
   * @param  {object} req.body
   * @returns {Promise} existing user object or creates new user basing user's email
   * @description creates or returns an existing user basing on user's email
   */
  static async RegisterUser(req, res) {
    const { email, mobile } = req.body;
    try {
      const userEmailExists = await UserServices.findUser({ email });
      const userMobileExists = await UserServices.findUser({ mobile });

      if (userEmailExists || userMobileExists) {
        const exception = userEmailExists
          ? `User with email ${email} already exists`
          : `User with phone number ${mobile} already exists`;
        return res.status(409).send({ message: exception });
      } else {
        const newUser = await UserServices.CreateUser(req.body);
        return res
          .status(201)
          .send({ message: 'User successfully created', user: newUser });
      }
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }

  static async LoginUser(req, res) {
    const { email, password } = req.body;
    const userExists = await UserServices.findUser({ email });
    if (userExists) {
      const userIsVerified = userExists.isVerified;
      if (userIsVerified) {
        const passwordsMatch = await userExists.isPasswordMatched(password);
        if (passwordsMatch) {
          const token = await TokenHandler.createToken({
            id: userExists._id,
            email: userExists.email,
          });
          res.status(200).send({
            message: 'Login Successful',
            data: {
              name: userExists.firstname + ' ' + userExists.lastname,
              email: userExists.email,
              role: userExists.role,
              token: token,
              decoded_token: await TokenHandler.decodeToken(token),

            },
          });
        } else {
          res.status(401).send({ message: 'Wrong Credentials' });
        }
      } else {
        res.status(403).send({ message: 'User email not verified' });
      }
    } else {
      res.status(404).send({ message: `User with that email doesn't exists` });
    }
  }

  /**
   * @param  {object} options
   * @returns {Promise}
   * @description returns all users or filtered using options param
   */
  static async getAllUsers(req, res) {
    const allusers = await UserServices.findAllUsers({});
    if (allusers) {
      return res.status(200).send({ users: allusers });
    } else {
      return res.status(404).send({ message: 'No Users Found' });
    }
  }

  // /**
  //  * @param  {object} options
  //  * @returns {Promise} any
  //  * @description returns a single user object basing on the options
  //  */
  static async getOneUser(req, res) {
    const data = { email: req.user.email, _id: req.user.id };
    validateMongoDbId(res, data._id);
    const user = await UserServices.findUser(data);
    if (user) {
      return res.status(200).send({ user: user });
    } else {
      return res.status(404).send({ message: 'User Not Found' });
    }
  }

  //  * @param  {object} data
  //  * @param {string} id  id of user object to be updated
  //  * @returns {Promise}
  //  * @description updates a single user object
  //  *@

  static async updateUser(req, res) {
    const data = { ...req.body };
    const id = req.user.id;
    validateMongoDbId(res, id);
    const updated = await UserServices.updateUser({ _id: id }, { ...data });
    // User.update({ _id: id }, { $set: { ...data } });
    return res.status(200).send({ message: updated });
  }

  // @description: for admin to delete a users account
  static async deleteUser(req, res) {
    const { id } = req.params;
    validateMongoDbId(res, id);
    try {
      const deletedUser = await UserServices.deleteUser(id);
      return res
        .status(200)
        .send({ message: 'User successfully deleted', user: deletedUser });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  }

  // @description: for user to deactivate their account
  static async deactivateAccount(req, res) {
    const { id } = req.user;
    validateMongoDbId(res, id);
    try {
      const deletedUser = await UserServices.deleteUser(id);
      return res
        .status(200)
        .send({ message: 'Account successfully deleted', user: deletedUser });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  }

  static async blockUser(req, res) {
    const { id } = req.params;
    validateMongoDbId(res, id);
    try {
      const blockUser = await UserServices.updateUser(id, { isBlocked: true });
      if (blockUser) {
        return res.status(204).send({ message: 'User successfully blocked' });
      }
      return res.status(400).send({ message: 'Operation not successful' });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  }

  static async unBlockUser(req, res) {
    const { id } = req.params;
    try {
      const unblockUser = await UserServices.updateUser(id, {
        isBlocked: false,
      });
      if (unblockUser) {
        return res.status(204).send({ message: 'User successfully unblocked' });
      }
      return res.status(400).send({ message: 'Operation not successful' });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  }
}
