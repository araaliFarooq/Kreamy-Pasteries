import JoiValidator from './JoiValidator.js';
import ValidateAuth from '../helpers/index.js';

export default class UserAuthValidator {
  static validateCreateUser(req, res, next) {
    return JoiValidator.validateRequestBody(
      req,
      res,
      next,
      ValidateAuth.createUserValidation
    );
  }

  static validateUserLogin(req, res, next) {
    return JoiValidator.validateRequestBody(
      req,
      res,
      next,
      ValidateAuth.userLoginValidation
    );
  }
}
