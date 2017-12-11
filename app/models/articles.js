const db = require('../../config/database/database');

const articles = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.getConnection().query('SELECT * FROM articles', (err, allArticle) => {
        err ? reject(err) : resolve(allArticle)
      });
    });
  },

  getLastArticles() {
    return new Promise((resolve, reject) => {
      db.getConnection().query('SELECT * FROM articles WHERE status = 1 ORDER BY createAt DESC LIMIT 0, 4', (err, allArticle) => {
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