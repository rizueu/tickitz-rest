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

  create (data = {}) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${this.table} SET ?`
      const query = this.db.query(sql, data, (error, results) => {
        return error ? reject(new Error(error)) : resolve(results)
      })
      console.log(query.sql)
    })
  }

  findOne (by = {}) {
    return new Promise((resolve, reject) => {
      const key = Object.keys(by)
      const value = Object.values(by)
      const sql = `SELECT ${key} FROM ${this.table} WHERE ${key}=?`
      const query = this.db.query(sql, value, (error, results) => {
        return error ? reject(new Error(error)) : resolve(results)
      })
      console.log(query.sql)
    })
  }

  findAll (by = {}) {
    return new Promise((resolve, reject) => {
      if (by) {
        const key = Object.keys(by)
        const value = Object.values(by)
        const sql = `SELECT * FROM ${this.table} WHERE ${key}=?`
        const query = this.db.query(sql, value, (error, results) => {
          return error ? reject(new Error(error)) : resolve(results)
        })
        console.log(query.sql)
      } else {
        const sql = `SELECT * FROM ${this.table}`
        const query = this.db.query(sql, (error, results) => {
          return error ? reject(new Error(error)) : resolve(results)
        })
        console.log(query.sql)
      }
    })
  }

  connect () {
    this.db.connect(error => error ? console.log(error) : console.log('Database correctly connected!'))
  }
}

module.exports = Database
