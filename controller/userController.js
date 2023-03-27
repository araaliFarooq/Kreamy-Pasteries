import model from '../models/userModel.js';

export default class UserController {
  /**
   * @param  {object} req.body
   * @returns {Promise} existing user object or creates new user basing user's email
   * @description creates or returns an existing user basing on user's email
   */
  static async CreateUser(req, res) {
    console.log('-->>', 'i am here');
    const { email } = req.body;
    const userExists = await model.find({ email: email });
    console.log('>>>>>>', userExists);
    if (!userExists) {
      const newUser = await model.create(req.body);
      return newUser;
    } else {
      return res.status(409).send({ message: 'User already exists' });
    }
  }
}
