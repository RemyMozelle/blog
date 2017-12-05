const articles = require('../models/articles');

const articlesController = {
  getAllArticle() {
    articles.getAll().then(articles => {
      console.log(articles)
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  }
}

module.exports = articlesController;