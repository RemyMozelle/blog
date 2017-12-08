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

  updateProfil(req, res) {
    admin.getAll().then(adminAll => {
      // if (req.isAuthenticated()) {
        res.render('../pages/admin/updateprofil.ejs',
          { 
              layout: '../layouts/admin',
              profil: adminAll        
            }
        )
      // } else {
      //   res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
      // }
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  },

  // updateStatus(req, res){
  //   articles.getAll().then(allArticles => {
  //     allArticles.filter((articlefiltered) => {
  //       if(articlefiltered.id == req.params.id){
  //         articles.remy().then(mireille => {
  //           console.log(mireille);
  //         })
  //         // if (req.isAuthenticated()) {
  //           if( articlefiltered.status == 1){
  //             // admin.query("UPDATE posts SET status = :status", { status: 0 });
  //           } else {
  //             // admin.query("UPDATE posts SET status = :status", { status: 1 });
  //           } 
  //           res.redirect('../pages/admin/published.ejs')
  //         // } else {
  //           //   res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
  //         // }
  //       }
  //     });
  //   }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  // updateProfile(req, res) {
  //   res.render('../pages/admin/updateprofil.ejs', { layout: '../layouts/admin' })
  // },

  getInsertArticle(req, res) {
    /* if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }*/

    let imgArticle = req.files.imgArticle
    
    const insertArticle = {
      title : req.body.title,
      content: req.body.content,
      createAt: new Date(),
      users_id: 1, 
      status: 0,
      img: imgArticle.name
    }
    
    articles.addArticle(insertArticle).then(result => {
      console.log("RESULT",result);
    }).catch(err => { console.log(err, 'ERROR ADD ARTICLE adminController (insertAticle)'); })
    
    imgArticle.mv(`./public/img/imgArticles/${imgArticle.name}`, (err) => {
      err ? console.log(err) : res.redirect('/newarticle')      
    })
  },

  getUpdateStatus(req, res){

    const statusToUpdate = {
      title : req.body.title,
      content: req.body.content,
      createAt: new Date(),
      users_id: 1, 
      status: 0
    }
    
    articles.addArticle(insertArticle).then(result => {
      console.log("RESULT",result);
    }).catch(err => { console.log(err, 'ERROR ADD ARTICLE adminController (insertAticle)'); })

    res.redirect('/newarticle');
  },
  
  // modifyArticle(req, res) {
  //   articles.getAll().then(articles => {
  //     articles.filter((articlefiltered) => {
  //       if(articlefiltered.id == req.params.id){
  //         if (req.isAuthenticated()) {
  //           res.render('../pages/admin/modify.ejs', {
  //             layout: '../layouts/admin',              
  //             article: articlefiltered
  //           })
  //         } else {
  //           res.send('vous devez être connecté pour avoir accèes au articles ! ')
  //         }
  //       }
  //     }).catch(err => { console.log(err, ' une erreur sur articlesController') })
  //   });  
  // },

  deleteArticle(req,res){
    articles.getAll().then(articles => {
      articles.filter( (articleFiltered) =>{
        if(articleFiltered.id === req.parmas.id){
          // if (req.isAuthenticated()) {
            articles.addArticle(insertArticle).then(result => {
              console.log("RESULT",result);
            }).catch(err => { console.log(err, 'ERROR ADD ARTICLE adminController (insertAticle)'); })
            res.redirect('/newarticle');
          // } else {
          //   res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
          // }
        }
      });
    }).catch(err => { console.log(err, ' une erreur sur articlesController') })    
  }
}

module.exports = adminController;