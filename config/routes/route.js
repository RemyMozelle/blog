const express = require('express');
const route = express.Router();

const usersController = require('../../app/controllers/usersController');

console.log(usersController.getOneUser())

route.get('/', (req, res) => {
  res.render('../pages/home.ejs')
})

route.get('/register', (req, res) => {
  res.render('../pages/register.ejs')
})

route.get('/login', (req, res) => {
  res.render('../pages/login.ejs')
})

// ADMIN
const articlesController = require('../../app/controllers/articlesController');
articlesController.getAllArticles()

route.get('/dashboard', (req, res) => {
  res.render('../pages/admin/dashboard.ejs', { layout: '../layouts/admin' });
})

route.get('/newarticle', (req, res) => {
  res.render('../pages/admin/newarticle.ejs', { layout: '../layouts/admin' })
})

route.get('/published', (req, res) => {
  res.render('../pages/admin/published.ejs', { layout: '../layouts/admin' })
})

route.get('/draft', (req, res) => {
  res.render('../pages/admin/draft.ejs', { layout: '../layouts/admin' })
})

route.get('/edithprofil', (req, res) => {
  res.render('../pages/admin/edithprofil.ejs', { layout: '../layouts/admin' })
})
// FIN ADMIN

module.exports = route;