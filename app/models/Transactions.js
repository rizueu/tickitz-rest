const Database = require('../config/Database')

class Transactions extends Database {
  constructor (table) {
    super(table)
    this.table = 'transactions'
  }
}

module.exports = new Transactions()
