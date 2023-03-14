import model from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

export default class UserController {
  /**
   * @param  {object} req.body
   * @returns {Promise} existing user object or creates new user basing user's email
   * @description creates or returns an existing user basing on user's email
   */
  // static async CreateUser(req, res) {
  //   const { email } = req.body;
  //   const userExists = await model.findOne({ email: email });
  //   if (!userExists) {
  //     const newUser = await model.create(req.body);
  //     return res.status(201).send({ message: 'User successfully created' });
  //   } else {
  //     return res.status(409).send({ message: 'User already exists' });
  //   }
  // }

  static CreateUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const userExists = await model.findOne({ email: email });
    if (!userExists) {
      const newUser = await model.create(req.body);
      return res.status(201).send({ message: 'User successfully created' });
    } else {
      return res.status(409).send({ message: 'User already exists' });
    }
  });
}
