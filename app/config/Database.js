const mysql = require('mysql2')

class Database {
  constructor () {
    const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env
    this.db = mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME
    })
  }

  connect () {
    this.db.connect(error => error ? console.log(error) : console.log('Database correctly connected!'))
  }
}

module.exports = Database
