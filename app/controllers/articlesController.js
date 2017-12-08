const articles = require('../models/articles');
const isAdmin = require('../../config/passport/passport');
const articlesController = {
  getLastArticles(req, res) {
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

  getAllArticles(req, res) {
    articles.getAll().then(articles => {
      if (req.isAuthenticated()) {
        res.render('../pages/articles.ejs', {
          allArticles: articles
        })
      } else {
        res.send('vous devez être connecté pour avoir accèes au articles ! ')
      }
      
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
      
  },

  getArticle(req, res) {
    articles.getAll().then(articles => {
      articles.filter((articlefiltered) => {
        if(articlefiltered.id == req.params.id){
          if (req.isAuthenticated()) {
            res.render('../pages/article.ejs', {
              article: articlefiltered
            })
          } else {
            res.send('vous devez être connecté pour avoir accèes au articles ! ')
          }
        }
      }).catch(err => { console.log(err, ' une erreur sur articlesController') })
    });  
  }

}

module.exports = articlesController;