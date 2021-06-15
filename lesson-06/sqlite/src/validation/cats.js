const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const schemaCreateCat = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  age: Joi.number().integer().min(1).max(45).required(),
  isVaccinated: Joi.boolean().optional(),
  features: Joi.array().optional(),
  owner: Joi.object().optional(),
});

const schemaUpdateCat = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  age: Joi.number().integer().min(1).max(45).optional(),
  isVaccinated: Joi.boolean().optional(),
  features: Joi.array().optional(),
  owner: Joi.object().optional(),
});

const schemaUpdateStatusCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const [{ message }] = error.details; // деструктуризация массива

    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    });
  }
  next();
};

module.exports.validateCreateCat = (req, _res, next) => {
  return validate(schemaCreateCat, req.body, next);
};

module.exports.validateUpdateCat = (req, _res, next) => {
  return validate(schemaUpdateCat, req.body, next);
};

module.exports.validateUpdateStatusCat = (req, _res, next) => {
  return validate(schemaUpdateStatusCat, req.body, next);
};
