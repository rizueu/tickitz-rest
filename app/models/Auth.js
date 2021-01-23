const Database = require('../config/Database')

class Auth extends Database {
  constructor (table) {
    super(table)
    this.table = 'users'
  }

  activate (id) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${this.table} SET verified = true WHERE id = ?`
      const query = this.db.query(sql, id, (error, response) => {
        if (error) return reject(new Error(error))
        resolve(response)
      })
      console.log(query.sql)
    })
  }

  setNewPassword (data = {}) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${this.table} SET password = "${data.newPassword}" WHERE id = ${data.id}`
      const query = this.db.query(sql, (error, response) => {
        if (error) return reject(new Error(error))
        resolve(response)
      })
      console.log(query.sql)
    })
  }
}

module.exports = new Auth()
