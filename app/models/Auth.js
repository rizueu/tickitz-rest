const Database = require('../config/Database')

class Auth extends Database {
  constructor (table) {
    super(table)
    this.table = 'users'
  }
}

module.exports = new Auth()
