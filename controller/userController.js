import model from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import TokenHandler from '../helpers/tokenHandler.js';

export default class UserController {
  /**
   * @param  {object} req.body
   * @returns {Promise} existing user object or creates new user basing user's email
   * @description creates or returns an existing user basing on user's email
   */
  static async CreateUser(req, res) {
    const { email } = req.body;
    const userExists = await model.findOne({ email });
    if (!userExists) {
      const newUser = await model.create(req.body);
      return res.status(201).send({ message: 'User successfully created' });
    } else {
      return res.status(409).send({ message: 'User already exists' });
    }
  }

  // static CreateUser = asyncHandler(async (req, res) => {
  //   const { email } = req.body;
  //   const userExists = await model.findOne({ email: email });
  //   if (!userExists) {
  //     const newUser = await model.create(req.body);
  //     return res.status(201).send({ message: 'User successfully created' });
  //   } else {
  //     return res.status(409).send({ message: 'User already exists' });
  //   }
  // });

  static async LoginUser(req, res) {
    const { email, password } = req.body;
    const userExists = await model.findOne({ email });
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
              token: token,
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
}
