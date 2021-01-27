const { response } = require('express')
const Database = require('../config/Database')

class Cinemas extends Database {
  constructor (table) {
    super(table)
    this.table = 'cinemas'
  }

  getShowtimes (showTimeDate, city) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT c.id, c.picture, c.cinemaName, c.address, c.pricePerSeat, t.showTime  FROM cinemas c INNER JOIN showtimes st ON c.id = st.cinemaId INNER JOIN times t ON st.timeId = t.id INNER JOIN movies m ON st.movieId = m.id WHERE st.showTimeDate = ? AND c.city = ?'
      const query = this.db.query(sql, [showTimeDate, city], (error, results) => {
        if (error) return reject(new Error(error))
        return resolve(results)
      })
      console.log(query.sql)
    })
  }

  getAllCinemas (limit, offset, keyword, order, sort) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM cinemas  
                   WHERE cinemaName LIKE "%${keyword}%"
                   ORDER BY ${order} ${sort} 
                   LIMIT ${limit} OFFSET ${offset}`
      const query = this.db.query(sql, (error, results) => {
        if (error) return reject(new Error(error))
        return resolve(results)
      })
      console.log(query.sql)
    })
  }

  update (id, picture, { cinemaName, address, pricePerSeat, city }) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM cinemas WHERE id = ?'
      this.db.query(sql, id, (error, results) => {
        if (error) {
          return reject(new Error(error))
        } else {
          const sql = 'UPDATE cinemas SET ? WHERE id = ?'

          this.db.query(sql, [
            {
              cinemaName: cinemaName || results[0].cinemaName,
              picture: picture || results[0].picture,
              address: address || results[0].address,
              pricePerSeat: pricePerSeat || results[0].pricePerSeat,
              city: city || results[0].city
            }, id], (error) => {
            if (error) {
              return reject(new Error(error))
            } else {
              return resolve(results)
            }
          })
        }
      })
    })
  }
}

module.exports = new Cinemas()
