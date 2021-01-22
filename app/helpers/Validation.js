const Joi = require('joi')

exports.registerValidation = data => {
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(5).required()
  })
  return schema.validate(data)
}
