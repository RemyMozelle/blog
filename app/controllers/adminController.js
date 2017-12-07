const admin = require('../models/admin');
const articles = require('../models/articles');

const adminController = {
  dashboard(req, res) {
    articles.getAll().then(articles => {
      // if (req.isAuthenticated()) {
        res.render('../pages/admin/dashboard.ejs',
          { 
            layout: '../layouts/admin',
            allArticles: articles        
          }
        )
      // } else {
      //   res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
      // }
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  },

  newarticle(req, res) {
    articles.getAll().then(articles => {
      // if (req.isAuthenticated()) {
        res.render('../pages/admin/newarticle.ejs',
          { 
            layout: '../layouts/admin',
            allArticles: articles        
          }
        )
      // } else {
      //   res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
      // }
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  },

  published(req, res) {
    articles.getAll().then(articles => {
      // if (req.isAuthenticated()) {
        res.render('../pages/admin/published.ejs',
          { 
            layout: '../layouts/admin',
            allArticles: articles        
          }
        )
      // } else {
      //   res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
      // }
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  },

  draft(req, res) {
    articles.getAll().then(articles => {
      // if (req.isAuthenticated()) {
        res.render('../pages/admin/draft.ejs',
          { 
            layout: '../layouts/admin',
            allArticles: articles        
          }
        )
      // } else {
      //   res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
      // }
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  },

  updateProfil(req, res) {
    articles.getAll().then(articles => {
      // if (req.isAuthenticated()) {
        res.render('../pages/admin/updateprofil.ejs',
          { 
              layout: '../layouts/admin',
              allArticles: articles        
            }
        )
      // } else {
      //   res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
      // }
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  },

  updateStatus(req, res){
    articles.getAll().then(allArticles => {
      allArticles.filter((articlefiltered) => {
        if(articlefiltered.id == req.params.id){
          articles.remy().then(mireille => {
            console.log(mireille);
          })
          // if (req.isAuthenticated()) {
            if( articlefiltered.status == 1){
              // admin.query("UPDATE posts SET status = :status", { status: 0 });
            } else {
              // admin.query("UPDATE posts SET status = :status", { status: 1 });
            } 
            res.redirect('../pages/admin/published.ejs')
          // } else {
            //   res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
          // }
        }
      });
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  }
}

module.exports = adminController
