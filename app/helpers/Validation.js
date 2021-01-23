const Joi = require('joi')

exports.registerValidation = data => {
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(5).required()
  })
  return schema.validate(data)
}

exports.loginValidation = data => {
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(5).required()
  })
  return schema.validate(data)
}

exports.newPasswordValidation = data => {
  const schema = Joi.object().keys({
    password: Joi.string().min(5).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password')
  })
  return schema.validate(data)
}
