const nodemailer = require('nodemailer')

const { SMTP_USER, SMTP_PASS } = process.env

const mailConfig = {
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
}

module.exports = nodemailer.createTransport(mailConfig)
