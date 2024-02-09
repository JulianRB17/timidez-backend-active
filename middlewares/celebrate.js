const validator = require('validator');
const { celebrate, Joi, Segments, errors } = require('celebrate');

const emailValidator = function (value, helpers) {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const celebrateCreateUserMiddleware = function () {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().custom(emailValidator),
      username: Joi.string().required(),
    }),
  });
};

module.exports = { celebrateCreateUserMiddleware };
