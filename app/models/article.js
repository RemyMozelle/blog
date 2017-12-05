const db = require('../../config/database/database');

const article = {
  getArticles() {
    return new Promise((resolve, reject) => {
      db.getConnection().query('SELECT * FROM users', (err, article) => {
        err ? reject(err) : resolve(article)
      });
    });
  },

  insertUsers() {
    database.getConnection().query('')
  }
}

module.exports = article;