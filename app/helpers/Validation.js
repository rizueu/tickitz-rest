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

exports.addMovieValidation = data => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    releaseDate: Joi.date().required(),
    duration: Joi.number(),
    category: Joi.required(),
    director: Joi.string().required(),
    casts: Joi.string().required(),
    synopsis: Joi.string()
  })
  return schema.validate(data)
}

exports.addGenreValidation = data => {
  const schema = Joi.object().keys({
    name: Joi.string().required()
  })
  return schema.validate(data)
}
