const Database = require('../config/Database')

class Times extends Database {
  constructor (table) {
    super(table)
    this.table = 'times'
  }
}

module.exports = new Times()
