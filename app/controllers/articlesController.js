const articles = require('../models/articles');

const articlesController = {
  getAllArticle(req, res) {
    articles.getAll().then(articles => {
      if (req.isAuthenticated()) {
        res.render('../pages/home.ejs', {
          allArticles: articles
        })
      } else {
        res.send('vous devez être connecté pour avoir accèes au articles ! ')
      }
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  },

  
}

module.exports = articlesController;