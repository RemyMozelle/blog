const admin = require('../models/admin');
const articles = require('../models/articles');
const db = require('../../config/database/database');

const adminController = {
  dashboard(req, res) {
    // console.log("REQ ", req.user)
    if (req.isAuthenticated() && req.user[0].roles == 'admin') {
      articles.getAll().then(articles => { 
        admin.getAll().then(adminAll => {
          adminAll.filter(adminfiltered => {
            if (adminfiltered.email == req.user[0].email) {
              if (req.isAuthenticated()) {
                res.render('../pages/admin/dashboard.ejs',
                  {
                    layout: '../layouts/admin',
                    allArticles: articles,
                    profil: adminfiltered
                  }
                )
              } else {
                res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
              }
            }
          })
        })
      }).catch(err => { console.log(err, ' une erreur sur articlesController') })
    } else {
      
      res.render('../pages/login.ejs', {
        errors: 'Vous devez être administrateur pour pouvoir y avoir accès'
      });
    }
  },

  newarticle(req, res) {
    if (req.isAuthenticated() && req.user[0].roles == 'admin') {
      articles.getAll().then(articles => {
        admin.getAll().then(adminAll => {
          adminAll.filter(adminfiltered => {
            if (adminfiltered.email == req.user[0].email) {
              if (req.isAuthenticated()) {
                res.render('../pages/admin/newarticle.ejs',
                  {
                    layout: '../layouts/admin',
                    allArticles: articles,
                    profil: adminfiltered
                  }
                )
              } else {
                res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
              }
            }
          })
        })
      }).catch(err => { console.log(err, ' une erreur sur articlesController') })
    } else {
      res.render('../pages/login.ejs', {
        errors: 'Vous devez être administrateur pour pouvoir y avoir accès'
      });
    }
  },

  published(req, res) {
    if (req.isAuthenticated() && req.user[0].roles == 'admin') {
      articles.getAll().then(articles => {
        admin.getAll().then(adminAll => {
          adminAll.filter(adminfiltered => {
            if (adminfiltered.email == req.user[0].email) {
              if (req.isAuthenticated()) {
                res.render('../pages/admin/published.ejs',
                  {
                    layout: '../layouts/admin',
                    allArticles: articles,
                    profil: adminfiltered
                  }
                )
              } else {
                res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
              }
            }
          })
        })
      }).catch(err => { console.log(err, ' une erreur sur articlesController') })
    } else {
      res.render('../pages/login.ejs', {
        errors: 'Vous devez être administrateur pour pouvoir y avoir accès'
      });
    }  
  },

  draft(req, res) {
    if (req.isAuthenticated() && req.user[0].roles == 'admin') {
      articles.getAll().then(articles => {
        admin.getAll().then(adminAll => {
          adminAll.filter(adminfiltered => {
            if (adminfiltered.email == req.user[0].email) {
              if (req.isAuthenticated()) {
                res.render('../pages/admin/draft.ejs',
                  {
                    layout: '../layouts/admin',
                    allArticles: articles,
                    profil: adminfiltered
                  }
                )
              } else {
                res.send('Vous devez être connecté pour avoir accèes aux articles ! ')
              }
            }
          })
        })
      }).catch(err => { console.log(err, ' une erreur sur articlesController') })
    } else {
      res.render('../pages/login.ejs', {
        errors: 'Vous devez être administrateur pour pouvoir y avoir accès'
      });
    }  
  },

  getUpdateProfil(req, res) {
    if (req.isAuthenticated() && req.user[0].roles == 'admin') {
      // console.log("REQ USER ",req.user[0].email)
      // Besoin des articles pour les comptabiliser dans le menu admin
      articles.getAll().then(articles => {
        //récupère tous les admin
        admin.getAll().then(adminAll => {
          // filtre tous les admin selon l'adressemail
          adminAll.filter(adminfiltered => {
            if (adminfiltered.email == req.user[0].email) {
              if (req.isAuthenticated()) {
                res.render('../pages/admin/updateprofil.ejs',
                  {
                    layout: '../layouts/admin',
                    profil: adminfiltered,
                    allArticles: articles,
                  }
                )
              } else {
                res.redirect('/')
              }
            }
          })
        })
      }).catch(err => { console.log(err, ' une erreur sur articlesController') })
    } else {
      res.render('../pages/login.ejs', {
        errors: 'Vous devez être administrateur pour pouvoir y avoir accès'
      });
    }  
  },

  updateProfileAdmin(req, res) {
    if (req.isAuthenticated() && req.user[0].roles == 'admin') {
      const avatarAdmin = req.files.avatar

      const updateProfil = {
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        email: req.body.email,
        avatar: avatarAdmin.name,
        about: req.body.about
      }
    
      admin.getAll().then(adminAll => {
        adminAll.filter(adminfiltered => {
          if (adminfiltered.email == req.user[0].roles) {
            if (req.isAuthenticated()) {
              admin.updateProfil(updateProfil, req.user[0].email).then(update => {
                avatarAdmin.mv(`./public/img/avatars/admin/${updateProfil.avatar}`, (err) => {
                  req.logout()
                  err ? console.log(err) : res.redirect('/login')
                })
              })
            }
          }
        })
      })
    } else {
      res.render('../pages/login.ejs', {
        errors: 'Vous devez être administrateur pour pouvoir y avoir accès'
      });
    }  
  },

  updateStatus(req, res) {
    if (req.isAuthenticated() && req.user[0].roles == 'admin') {
      //récupère tous les articles
      articles.getAll().then(updateStatus => {
        //filtre les articles selon id passé en url
        updateStatus.filter(articleFiltered => {
          if (req.params.id == articleFiltered.id) {
            //si url en GET == a l'ID articleFiltered on change son status
            if (articleFiltered.status === 1) {
              admin.updatePublish(0, articleFiltered.id).then(result => {
                res.redirect('/dashboard')
              }).catch(err => { console.log(err, "updateStatus problème"); })
            } else {
              //passe le status a 1
              admin.updatePublish(1, articleFiltered.id).then(result => {
                res.redirect('/dashboard')
              }).catch(err => { console.log(err, "updateStatus problème"); })
            }
          }
        })
      }).catch(err => { console.log(err, 'error sur update status') })
    } else {
      res.render('../pages/login.ejs', {
        errors: 'Vous devez être administrateur pour pouvoir y avoir accès'
      });
    }  
  },

  getInsertArticle(req, res) {
    /* if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }*/
    if (req.isAuthenticated() && req.user[0].roles == 'admin') {
      const imgArticle = req.files.imgArticle

      const insertArticle = {
        title: req.body.title,
        content: req.body.content,
        createAt: new Date(),
        users_id: 1,
        status: 0,
        img: imgArticle.name
      }

      articles.addArticle(insertArticle).then(result => {
        console.log("RESULT", result);
      }).catch(err => { console.log(err, 'ERROR ADD ARTICLE adminController (insertAticle)'); })

      imgArticle.mv(`./public/img/imgArticles/${imgArticle.name}`, (err) => {
        err ? console.log(err) : res.redirect('/newarticle')
      })
    } else {
      res.render('../pages/login.ejs', {
        errors: 'Vous devez être administrateur pour pouvoir y avoir accès'
      });
    }  
  },

  getModifyArticle(req, res) {
    if (req.isAuthenticated() && req.user[0].roles == 'admin') {
      articles.getAll().then(allArticlesM => {
        admin.getAll().then(adminAll => {
          adminAll.filter(adminfiltered => {
            if (adminfiltered.email == req.user[0].email) {
              allArticlesM.filter(articleFiltered => {
                if (req.params.id == articleFiltered.id) {
                  console.log(articleFiltered);
                  res.render('../pages/admin/modify.ejs', {
                    layout: '../layouts/admin',
                    allArticles: allArticlesM,
                    article: articleFiltered,
                    profil: adminfiltered
                  })
                }
              })
            }
          })
        })
      })
    } else {
      res.render('../pages/login.ejs', {
        errors: 'Vous devez être administrateur pour pouvoir y avoir accès'
      });
    }  
  },

  /**
   * Modifier un article 
   * @param {*} req 
   * @param {*} res 
   */
  modifyArticle(req, res) {
    if (req.isAuthenticated() && req.user[0].roles == 'admin') {
      const imgArticle = req.files.imgArticle
  
      const updateArticle = {
        title: req.body.title,
        content: req.body.content,
        createAt: new Date(),
        users_id: 1,
        status: 0,
        img: imgArticle.name
      }

      articles.getAll().then(allArticles => {
        allArticles.filter(articleFiltered => {
          if (req.params.id == articleFiltered.id) {
            console.log(articleFiltered);
            admin.modify(updateArticle, articleFiltered.id).then(updateArticle => {
              imgArticle.mv(`./public/img/imgArticles/${updateArticle.img}`, (err) => {
                err ? console.log(err) : res.redirect('/dashboard')
              })
            }).catch(err => { console.log(err, ' impossible de modifié cette article') })
          }
        })
      })
    } else {
      res.render('../pages/login.ejs', {
        errors: 'Vous devez être administrateur pour pouvoir y avoir accès'
      });
    }  
  },

  deleteArticle(req, res) {
    if (req.isAuthenticated() && req.user[0].roles == 'admin') {
      articles.getAll().then(allArticles => {
        allArticles.filter(articleFiltered => {
          if (req.params.id == articleFiltered.id) {
            admin.deleteArticle(articleFiltered.id).then(deleteOne => {
              console.log(deleteOne);
              res.redirect('/dashboard');
            }).catch(err => { console.log(err, `impossible de supprimer l'article`); })
          }
        })
      })
    } else {
      res.render('../pages/login.ejs', {
        errors: 'Vous devez être administrateur pour pouvoir y avoir accès'
      });
    }
  }  
}

module.exports = adminController;