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
  },

  // remy() {
  //   return new Promise((resolve, reject) => {
  //     db.getConnection().query("UPDATE articles SET status = :status", (err, currentArticleStatus) => {
  //       console.log(resolve)
  //       err ? reject(err) : resolve(currentArticleStatus)
  //     });
  //   });
  //         // admin.query("UPDATE posts SET status = :status", { status: 0 });

  //         // admin.query("UPDATE posts SET status = :status", { status: 1 });

  //     }
  //   // });
  // // }  
}

module.exports = articles;