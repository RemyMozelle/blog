const articles = require('../models/articles');

const articlesController = {
  getAllArticles() {
    articles.getAll().then(allArticles => {
      console.log(allArticles)
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  }
}

module.exports = articlesController;