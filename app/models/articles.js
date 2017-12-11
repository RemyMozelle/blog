const db = require('../../config/database/database');

const articles = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.getConnection().query('SELECT * FROM articles', (err, allArticle) => {
        err ? reject(err) : resolve(allArticle)
      });
    });
  },

  getLastArticle() {
    return new Promise((resolve, reject) => {
      db.getConnection().query('SELECT * FROM articles ORDER BY createAt DESC LIMIT 0, 4', (err, allArticle) => {
        err ? reject(err) : resolve(allArticle)
      });
    });
  },

  addArticle(insertArticle) {
    return new Promise((resolve, reject) => {
      db.getConnection().query('INSERT INTO articles SET ?', insertArticle, (err, article) => {
        err ? reject(err) : resolve(article)
      })
    });
  }

}

module.exports = articles;