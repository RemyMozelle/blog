const db = require('../../config/database/database');

const article = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.getConnection().query('SELECT * FROM articles', (err, article) => {
        err ? reject(err) : resolve(article)
      });
    });
  },

  insertArticle() {
    database.getConnection().query('')
  }
}

module.exports = article;