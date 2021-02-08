// import Database
const Database = require('../config/Database')
class SoldSeatsModel extends Database {
  constructor (table) {
    super()
    this.table = table
  }

  create (showTimeId, seats) {
    const sql = `INSERT INTO ${this.table} SET ?`
    return new Promise((resolve, reject) => {
      seats.forEach(item => {
        this.db.query(sql, { showTimeId, seatCode: item.trim() }, (err, result) => {
          if (err) {
            return reject(err)
          } else if (result.affectedRow < 1) {
            return resolve(false)
          } else {
            return resolve(true)
          }
        })
      })
    })
  }

  getSoldSeats (showTimeId) {
    const sql = `SELECT DISTINCT sold_seats.seatCode
                 FROM sold_seats INNER JOIN showtimes 
                 ON sold_seats.showTimeId = showtimes.id
                 INNER JOIN times ON showtimes.timeId = times.id
                 WHERE sold_seats.showTimeId = ${showTimeId}
                `
    return new Promise((resolve, reject) => {
      const query = this.db.query(sql, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result)
        }
      })
      console.log(query.sql)
    })
  }

  getSoldSeatByCondition (condition) {
    const sql = `SELECT ${this.table}.id, ${this.table}.seatCode, ${this.table}.showTimeId, showtimes.cinemaId, showtimes.movieId FROM ${this.table} INNER JOIN showtimes ON ${this.table}.showTimeId = showtimes.id WHERE ${Object.keys(condition).map((item, index) => `showtimes.${item} = ${Object.values(condition)[index]}`).join(' AND ')}`
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          console.log(sql)
          return resolve(result)
        }
      })
    })
  }
}

module.exports = new SoldSeatsModel('sold_seats')
