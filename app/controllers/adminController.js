const admin = require('../models/admin');

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
  }
}

module.exports = adminController
