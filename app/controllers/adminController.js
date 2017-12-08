const admin = require('../models/admin');
const articles = require('../models/articles');
const db = require('../../config/database/database');

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


  getInsertArticle(req, res) {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }

    let imgArticle = req.files.imgArticle
    console.log(imgArticle.name);

    imgArticle.mv(`./public/img/${imgArticle.name}`, (err) => {
      err ? console.log(err) : res.send('uploadé')      
    })

    const insert = {
      title : req.body.title,
      content: req.body.content,
      createAt: new Date(),
      users_id: 1, 
      status: 0
    }

    articles.addArticle(insert).then(result => {
    }).catch(err => { console.log(err, 'ERROR ADD ARTICLE adminController (insertAticle)'); })
/* 
    res.redirect('/newarticle'); */
  }
}

module.exports = adminController
