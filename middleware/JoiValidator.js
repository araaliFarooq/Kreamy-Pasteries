import Joi from 'joi';

export default class JoiValidator {
  static validateRequestBody(req, res, next, schema) {
    const { body } = req;
    const { error } = schema.validate(body, { abortEarly: false });
    const errors = [];
    if (error) {
      console.log('error: ', error);
      error.details.forEach((e) => errors.push(e.message));
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    return next();
  }
}
