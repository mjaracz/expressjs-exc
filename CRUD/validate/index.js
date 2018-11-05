const Joi = require('joi');


function validateCourse(req) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(req.body, schema);
}

module.exports = validateCourse;