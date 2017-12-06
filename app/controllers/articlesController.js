const articles = require('../models/articles');

const articlesController = {
  getAllArticle() {
    articles.getAll().then(articles => {
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  }
}

module.exports = articlesController;