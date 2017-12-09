const articles = require('../models/articles');
const isAdmin = require('../../config/passport/passport');
const articlesController = {
  getLastArticles(req, res) {
    articles.getAll().then(articles => {
      if (req.isAuthenticated()) {
        res.render('../pages/home.ejs', {
          allArticles: articles,
          curentUser: req.user
        })
      } else {
        res.render('../pages/home.ejs', {
          allArticles: articles,
        })
      }
    }).catch(err => { console.log(err, ' une erreur sur articlesController1') })

  },

  getAllArticles(req, res) {
    articles.getAll().then(articles => {
      if (req.isAuthenticated()) {
        res.render('../pages/home.ejs', {
          allArticles: articles,
          curentUser: req.user
        })
      } else {
        res.render('../pages/home.ejs', {
          allArticles: articles,
        })
      }
    }).catch(err => { console.log(err, ' une erreur sur articlesController2') })

  },

  getArticle(req, res) {
    articles.getAll().then(articles => {
      articles.filter((articlefiltered) => {
        if (req.isAuthenticated()) {
          res.render('../pages/home.ejs', {
            allArticles: articles,
            curentUser: req.user
          })
        } else {
          res.render('../pages/home.ejs', {
            allArticles: articles,
          })
        }
      }).catch(err => { console.log(err, ' une erreur sur articlesController3') })
    });
  }

}

module.exports = articlesController;