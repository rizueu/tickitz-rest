const Database = require("../config/Database");

class Transactions extends Database {
  constructor(table) {
    super(table);
    this.table = table;
  }

  create(userId, body) {
    const data = {
      userId,
      ticketDate: body.ticketDate,
      ticketTime: body.ticketTime,
      movieTitle: body.movieTitle,
      cinemaName: body.cinemaName,
      cinemaPoster: body.cinemaPoster,
      cinemaCity: body.cinemaCity,
      ticketCount: body.ticketCount,
      seats: body.seats,
      totalPayment: body.totalPayment,
      paymentMethod: body.paymentMethod,
    };

    const sql = `INSERT INTO ${this.table} SET ?`;
    return new Promise((resolve, reject) => {
      const query = this.db.query(sql, data, (err, result) => {
        if (err) {
          return reject(err);
        } else if (result.affectedRow < 1) {
          return resolve(false);
        } else {
          return resolve({
            id: result.insertId,
          });
        }
      });
      console.log(query.sql);
    });
  }

  getShowTimeId(ticketDate) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT id FROM showtimes WHERE ticketDate = ?";
      this.db.query(sql, ticketDate, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  getOrderHistory(userId) {
    const sql = `SELECT id, ticketDate, ticketTime, movieTitle cinemaPoster, cinemaName FROM ${this.table} WHERE userId = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, userId, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  getOrderHistoryDetail(id, userId) {
    const sql = `SELECT * FROM ${this.table} WHERE userId = ? AND id = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, [userId, id], (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  delete(id) {
    const sql = `DELETE FROM ${this.table} WHERE id = ?`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, [id], (err, result) => {
        if (err) {
          return reject(err);
        } else if (result.affectedRow < 1) {
          return resolve(false);
        } else {
          return resolve(true);
        }
      });
    });
  }
}

module.exports = new Transactions("transactions");
