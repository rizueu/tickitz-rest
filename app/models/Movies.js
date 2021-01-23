const Database = require('../config/Database')

class Movies extends Database {
  constructor (table) {
    super(table)
    this.table = 'movies'
  }
}

module.exports = new Movies()
