import Joi from '@hapi/joi';

// export default class ValidateAuth {
const createUserValidation = Joi.object()
  .keys({
    firstname: Joi.string().required().trim(),
    lastname: Joi.string().required().trim(),
    email: Joi.string()
      .email()
      .required()
      .trim()
      .messages({ 'string.email': 'Email must be a valid email' }),
    mobile: Joi.string().required().trim(),
    password: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .messages({ 'any.only': "Passwords don't match" }),
  })
  .min(6)
  .max(6);

const userLoginValidation = Joi.object()
  .keys({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
  })
  .min(2)
  .max(2);
// }
export default { createUserValidation, userLoginValidation };
