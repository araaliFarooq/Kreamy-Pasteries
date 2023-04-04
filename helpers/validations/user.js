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
      .pattern(
        new RegExp(
          /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d)(?=.*[A-Z]).{7,}$/
        )
      )
      .required()
      .trim()
      .messages({
        'string.pattern.base': `Password must contain at least one special character, one number, one capital letter, and should be longer than 6 characters:`,
        'string.empty': `Password cannot be empty`,
        'any.required': `Password is required`,
      }),
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .messages({ 'any.only': "Passwords don't match" }),
  })
  .min(6)
  .max(6);

const userLoginValidation = Joi.object()
  .keys({
    email: Joi.string()
      .email()
      .required()
      .trim()
      .messages({ 'string.email': 'Email must be a valid email' }),
    password: Joi.string().required().trim(),
  })
  .min(2)
  .max(2);
// }
export default { createUserValidation, userLoginValidation };
