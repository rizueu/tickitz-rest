const { response, query } = require('express')
const Database = require('../config/Database')

class Movies extends Database {
  constructor (table) {
    super(table)
    this.table = 'movies'
  }

  createMovie (data) {
    return new Promise((resolve, reject) => {
      const { title, releaseDate, duration, month, category, director, casts, synopsis, picture, genreId } = data
      const sql = `SELECT * FROM genres 
                WHERE id IN (${typeof genreId === 'string' ? genreId : genreId.map(item => item).join()})`
      this.db.query(sql, (error, genreResult) => {
        const genresId = []
        if (error) {
          return reject(new Error(error))
        } else {
          genreResult.forEach(item => {
            genresId.push(item)
          })
        }
        if (genresId.length < 1 && typeof genreId === 'string') {
          return resolve(new Error('Unknown genre'))
        }
        if (genreId.length !== genresId.length && typeof genreId === 'object') {
          return resolve(new Error('Unknown genre'))
        }
        this.db.query('INSERT INTO movies SET ?', { title, releaseDate, duration, month, category, director, casts, synopsis, picture }, (error, response) => {
          if (error) return reject(new Error(error))
          if (typeof genreId === 'object') {
            genreId.forEach(item => {
              this.db.query('INSERT INTO movie_genres SET ?', { movie_id: response.insertId, genre_id: item }, (error, results) => {
                return (error) ? reject(new Error(error)) : resolve(results)
              })
            })
          } else {
            this.db.query('INSERT INTO movie_genres SET ?', { movie_id: response.insertId, genre_id: genreId }, (error, results) => {
              return (error) ? reject(new Error(error)) : resolve(results)
            })
          }
        })
      })
    })
  }

  getAllMovies (limit, offset, search, order, sort) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT 
                    movies.id, movies.title, movies.releaseDate, movies.month, movies.duration, movies.category, movies.director, movies.casts, movies.synopsis, movies.picture, movies.createdAt, movies.updatedAt, genres.name AS genres
                  FROM movies 
                  INNER JOIN movie_genres ON movies.id = movie_genres.movie_id
                  INNER JOIN genres ON genres.id = movie_genres.genre_id
                  WHERE movies.title LIKE "%${search}%"
                  ORDER BY ${order} ${sort}`
      const query = this.db.query(sql, (error, results) => {
        if (error) return reject(new Error(error))
        const movieGenres = []
        results.forEach((item) => {
          movieGenres.push({
            id: item.id,
            genre: item.genres
          })
        })

        let data = results.filter((item, index, array) => {
          return ((item.id !== ((index >= array.length - 1 ? 0 : array[index + 1].id))))
        })

        data = data.map((item) => {
          return {
            id: item.id,
            title: item.title,
            releaseDate: item.releaseDate,
            month: item.month,
            duration: item.duration,
            category: item.category,
            director: item.director,
            casts: item.casts,
            synopsis: item.gorgeus,
            picture: `${process.env.APP_URL}/uploads/${item.picture}`,
            genres: movieGenres.filter(genreItem => genreItem.id === item.id).map(item => item.genre).join(', '),
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          }
        })
        return resolve(data)
      })
      console.log(query.sql)
    })
  }

  getMovieById (id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT movies.id, movies.title,
                   movies.picture, movies.releaseDate,
                   movies.month, movies.category,
                   movies.duration, movies.director,
                   movies.casts, movies.synopsis,
                   movies.createdAt, movies.updatedAt,
                   genres.name AS genres FROM movies
                   INNER JOIN movie_genres ON 
                   movies.id = movie_genres.movie_id
                   INNER JOIN genres ON
                   genres.id = movie_genres.genre_id
                   WHERE movies.?`
      const query = this.db.query(sql, id, (error, results) => {
        if (error) {
          return reject(new Error(error))
        } else if (results.length < 1) {
          return reject(new Error(`Movie with id: ${id} is not exists`))
        } else {
          const movieGenres = []
          results.forEach((item) => {
            movieGenres.push({
              id: item.id,
              genre: item.genres
            })
          })

          let data = results.filter((item, index, array) => {
            console.log(item.id + ' ' + array[index + (index >= array.length - 1 ? 0 : 1)].id)
            return ((item.id !== ((index >= array.length - 1 ? 0 : array[index + 1].id))))
          })

          data = data.map((item, index) => {
            return {
              id: item.id,
              title: item.title,
              releaseDate: item.releaseDate,
              month: item.month,
              duration: item.duration,
              category: item.category,
              director: item.director,
              casts: item.casts,
              synopsis: item.gorgeus,
              picture: `${process.env.APP_URL}/uploads/${item.picture}`,
              genres: movieGenres.filter(genreItem => genreItem.id === item.id).map(item => item.genre).join(', '),
              createdAt: item.createdAt,
              updatedAt: item.updatedAt
            }
          })
          return resolve(data)
        }
      })
      console.log(query.sql)
    })
  }

  updateMovie (id, picture, { title, releaseDate, duration, director, casts, synopsis, category, genreId }) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM movies WHERE id = ?'
      this.db.query(sql, id, (err, results) => {
        if (err) {
          return reject(err)
        } else {
          if (typeof genreId === 'object' || typeof genreId === 'string') {
            this.db.query(`SELECT * FROM genres WHERE id IN (${typeof genreId === 'string' ? genreId : genreId.map(item => item).join()})`, (err, genreResult) => {
              const genresId = []
              if (err) {
                return reject(err)
              } else {
                genreResult.forEach(item => {
                  genresId.push(item)
                })
              }

              if ((genreId.length !== genresId.length && typeof genreId === 'object') || genreResult.length < 1) {
                return reject(new Error('Unknown Movie'))
              }

              const sql = 'UPDATE movies SET ? WHERE id = ?'
              this.db.query(sql, [
                {
                  title: title || results[0].title,
                  releaseDate: releaseDate || results[0].releaseDate,
                  duration: duration || results[0].duration,
                  category: category || results[0].category,
                  director: director || results[0].director,
                  casts: casts || results[0].casts,
                  synopsis: synopsis || results[0].synopsis,
                  picture: picture || results[0].picture
                }, id], (err, response) => {
                if (err) {
                  return reject(err)
                } else {
                  if (typeof genreId === 'object') {
                    genreId.forEach((item, index) => {
                      this.db.query('SELECT id FROM movie_genres WHERE movie_id = ?', Number(id), (err, result) => {
                        if (err) {
                          return reject(err)
                        } else {
                          this.db.query('UPDATE movie_genres SET ? WHERE movie_id = ? AND id = ?', [{ genre_id: item }, Number(id), result[index].id], err => {
                            if (err) {
                              return reject(err)
                            }
                          })
                        }
                      })
                    })
                  } else {
                    this.db.query('SELECT id FROM movie_genres WHERE movie_id = ?', Number(id), (err, result) => {
                      if (err) {
                        return reject(err)
                      } else {
                        this.db.query('UPDATE movie_genres SET ? WHERE movie_id = ? AND id = ?', [{ genre_id: genreId }, Number(id), result[0].id], err => {
                          if (err) {
                            return reject(err)
                          }
                        })
                      }
                    })
                  }
                  return resolve(response)
                }
              })
            })
          } else {
            const sql = 'UPDATE movies SET ? WHERE id = ?'
            this.db.query(sql, [
              {
                title: title || results[0].title,
                releaseDate: releaseDate || results[0].releaseDate,
                duration: duration || results[0].duration,
                category: category || results[0].category,
                director: director || results[0].director,
                casts: casts || results[0].casts,
                synopsis: synopsis || results[0].synopsis,
                picture: picture || results[0].picture
              }, id], (err, response) => {
              if (err) {
                return reject(err)
              } else {
                return resolve(response)
              }
            })
          }
        }
      })
    })
  }
}

module.exports = new Movies()
