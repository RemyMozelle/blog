const db = require('../../config/database/database');

const users = {
  getOne() {
    return new Promise((resolve, reject) => {
      db.getConnection().query('SELECT * FROM users', (err, users) => {
        err ? reject(err) : resolve(users)
      });
    });
  },

  insertUsers() {
    database.getConnection().query('')
  }
}

module.exports = users;