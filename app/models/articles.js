const db = require('../../config/database/database');

const articles = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.getConnection().query('SELECT * FROM articles', (err, allArticle) => {
        err ? reject(err) : resolve(allArticle)
      });
    });
  },

  insertArticle() {
    database.getConnection().query('')
  }
}

module.exports = articles;