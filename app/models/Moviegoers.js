const Database = require('../config/Database')

class Moviegoers extends Database {
  constructor (table) {
    super(table)
    this.table = 'moviegoers'
  }
}

module.exports = new Moviegoers()
