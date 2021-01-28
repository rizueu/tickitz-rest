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

  update (id, email, body) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${this.table} SET ? WHERE id = ? AND email = ?`
      const b = this.db.query(sql, [body, id, email], (err, result) => {
        if (err) {
          return reject(err)
        } else if (result.affectedRows < 1) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
      console.log(b.sql)
    })
  }

  getUserByCondition (data) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${this.table} WHERE ${Object.keys(data).map((item, index) => `${item} = '${Object.values(data)[index]}'`).join(' AND ')}`

      this.db.query(sql, (err, result) => {
        if (err) {
          return reject(err)
        } else if (result.length < 1) {
          resolve(false)
        } else {
          resolve(result)
        }
      })
    })
  }
}

module.exports = new Auth()
