const admin = require('../models/admin');
const articles = require('../models/articles');
const isAdmin = require('../../config/passport/passport');
const articlesController = {
  getLastArticles(req, res) {
    articles.getLastArticles().then(articles => {
      admin.getAll().then(allBloger => {
        // console.log("allbloger", allBloger)
        if (req.isAuthenticated()) {
          res.render('../pages/home.ejs', {
            statusMenu: "connecté",
            allArticles: articles,
            curentUser: req.user,
            bloger: allBloger[1]
          })
        } else {
          res.render('../pages/home.ejs', {
            statusMenu: "non-connecté",
            allArticles: articles,
            bloger: allBloger[1]
          })
        }
      })
    }).catch(err => { console.log(err, ' une erreur sur articlesController1') })
  },

  getAllArticles(req, res) {
    articles.getAll().then(articles => {
      admin.getAll().then(allBloger => {
        // console.log("allbloger", allBloger)
        if (req.isAuthenticated()) {
          res.render('../pages/articles.ejs', {
            statusMenu: "connecté",
            allArticles: articles,
            curentUser: req.user,
            bloger: allBloger[1]            
          })
        } else {
          res.render('../pages/articles.ejs', {
            statusMenu: "non-connecté",
            allArticles: articles,
            bloger: allBloger[1]            
          })
        }
      })
    }).catch(err => { console.log(err, ' une erreur sur articlesController2') })

  },

  getArticle(req, res) {
    articles.getAll().then(articles => {
      articles.filter((articlefiltered) => {
        admin.getAll().then(allBloger => {
          // console.log("allbloger", allBloger)
          if (articlefiltered.id == req.params.id) {
            if (req.isAuthenticated()) {
              res.render('../pages/article.ejs', {
                statusMenu: "connecté",
                article: articlefiltered,
                curentUser: req.user,
                bloger: allBloger[1]                
              })
            } else {
              res.render('../pages/article.ejs', {
                statusMenu: "non-connecté",
                article: articlefiltered,
                bloger: allBloger[1]                
              })
            }
          }
        })
      }).catch(err => { console.log(err, ' une erreur sur articlesController3') })
    });
  }
}

module.exports = articlesController;