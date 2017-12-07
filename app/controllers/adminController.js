const admin = require('../models/admin');
const articles = require('../models/articles');
const db = require('../../config/database/database');

const adminController = {
  dashboard(req, res) {
    res.render('../pages/admin/dashboard.ejs', { layout: '../layouts/admin' });
  },

  newarticle(req, res) {
    res.render('../pages/admin/newarticle.ejs', { layout: '../layouts/admin' })
  },

  publish(req, res) {
    res.render('../pages/admin/published.ejs', { layout: '../layouts/admin' })
  },

  draft(req, res) {
    res.render('../pages/admin/draft.ejs', { layout: '../layouts/admin' })
  },

  updateProfile(req, res) {
    res.render('../pages/admin/updateprofil.ejs', { layout: '../layouts/admin' })
  },

  getInsertArticle(req, res) {

    const insert = {
      title : req.body.title,
      content: req.body.content,
      createAt: new Date(),
      users_id: 1, 
      status: 0
    }
    
    articles.addArticle(insert).then(result => {
      console.log(result);
    }).catch(err => { console.log(err, 'ERROR ADD ARTICLE adminController (insertAticle)'); })

    res.redirect('/newarticle');
  }
}

module.exports = adminController
