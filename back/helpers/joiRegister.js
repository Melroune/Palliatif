const Joi = require("joi")

module.exports = Joi.object().keys({
  email: Joi.string().email().required(),
  civilite: Joi.string().alphanum(),
  fristname: Joi.string().alphanum(),
  lastname: Joi.string().alphanum(),
  Adresse: Joi.string().alphanum(),
  codePostal: Joi.number().integer(),
  ville: Joi.string().alphanum(),
  telFix: Joi.number().integer(),
  telMob: Joi.number().integer(),
  structure: Joi.string().alphanum(),
  service: Joi.string().alphanum(),
  fonction: Joi.string().alphanum(),
});
