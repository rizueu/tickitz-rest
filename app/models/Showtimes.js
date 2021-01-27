const Database = require('../config/Database')

class Showtimes extends Database {
  constructor (table) {
    super(table)
    this.table = 'showtimes'
  }
}

module.exports = new Showtimes()
