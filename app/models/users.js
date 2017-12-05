const db = require('../../config/database/database');

const users = {
  getOne() {
    db.getConnection().query('SELECT * FROM users', (err, users) => {
      console.log(users)
    });
  },

  insertUsers() {
    database.getConnection().query('')
  }
}

module.exports = users;