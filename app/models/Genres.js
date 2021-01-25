const Database = require('../config/Database')

class Genres extends Database {
  constructor (table) {
    super(table)
    this.table = 'genres'
  }

  getAllGenres (limit, offset, search, order, sort) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${this.table}  
                   WHERE name LIKE "%${search}%"
                   ORDER BY ${order} ${sort} 
                   LIMIT ${limit} OFFSET ${offset}`
      this.db.query(sql, (error, results) => {
        if (error) return reject(new Error(error))
        return resolve(results)
      })
    })
  }

  getMoviesByGenre (genre, limit, offset, order, sort) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT 
                    movies.id, movies.title,
                    movies.poster, movies.releaseDate,
                    movies.duration, movies.direct,
                    movies.casts, movies.synopsis,
                    genres.name AS genres 
                  FROM movies
                  INNER JOIN movie_genres ON 
                    movies.id = movie_genres.movie_id
                  INNER JOIN genres ON
                    genres.id = movie_genres.genre_id
                  WHERE genres.name = ${genre}
                  ORDER BY ${order} ${sort} 
                  LIMIT ${limit} OFFSET ${offset}`
      const query = this.db.query(sql, (error, response) => {
        return error ? reject(new Error(error)) : resolve(response)
      })
      console.log(query.sql)
    })
  }

  patchGenre (id, data = {}) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${this.table} SET ? WHERE id = ${id}`
      const query = this.db.query(sql, data, (error, response) => {
        if (error) return reject(new Error(error))
        return resolve(response)
      })
      console.log(query)
    })
  }
}

module.exports = new Genres()
