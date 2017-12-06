const db = require('../../config/database/database');

const users = {
  getAll() {
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