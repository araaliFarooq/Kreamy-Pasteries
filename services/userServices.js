import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import TokenHandler from '../helpers/tokenHandler.js';

export default class UserServices {
  // /**
  //  * @param  {object} req.body
  //  * @returns {Promise} existing user object or creates new user basing user's email
  //  * @description creates or returns an existing user basing on user's email
  //  */
  static async CreateUser(object) {
    const newUser = await User.create(object);
    return newUser;
  }

  // /**
  //  * @param  {object} options
  //  * @returns {Promise}
  //  * @description returns all users or filtered using options param
  //  */
  static async findAllUsers(options) {
    const allusers = await User.find(options);
    return allusers;
  }

  // /**
  //  * @param  {object} options
  //  * @returns {Promise} any
  //  * @description returns a single user object basing on the options
  //  */
  static async findUser(options) {
    const user = await User.findOne(options);
    return user;
  }

  //  * @param  {object} data
  //  * @param {string} id  id of user object to be updated
  //  * @returns {Promise}
  //  * @description updates a single user object
  //  *@
  static async updateUser(id, data) {
    const updated = await User.findOneAndUpdate(
      { _id: id },
      { $set: { ...data } }
    );
    return updated;
  }
}
