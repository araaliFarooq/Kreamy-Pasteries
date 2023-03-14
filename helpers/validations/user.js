import * as Joi from '@hapi/joi';

const createUserValidation = Joi.object()
  .keys({
    firstname: Joi.string().required().trim(),
    lastname: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    mobile: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
    confirmPassword: Joi.string().required().trim(),
  })
  .min(6)
  .max(6);

const userLoginValidation = Joi.object()
  .keys({
    username: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
  })
  .min(2)
  .max(2);

export default { createUserValidation, userLoginValidation };
