const express = require('express');
const route = express.Router();

const usersController = require('../../app/controllers/usersController');
const articleController = require('../../app/controllers/articlesController');
const expressValidator = require('express-validator');

articleController.getAllArticle() // renvoie tous les articles
usersController.getAllUsers() // renvoie tous les users

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

/**
 * debut insertion des données
 */
const db = require('../database/database');

route.post('/register', (req, res) => {

  req.checkBody('name', 'le prenom ne peut être vide').notEmpty()
  req.checkBody('surname', 'le nom ne peut être vide').notEmpty()
  req.checkBody('email', 'l\'email ne peut être vide').notEmpty()
  req.checkBody('password', 'le mot de passe ne peut être vide').notEmpty()

  const error = req.validationErrors();

  const data = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password
  }

  if (error) {
    console.log(error, 'IF ERROR');
    res.render('../pages/register.ejs', {
      errors: error
    })
  } else {
    db.getConnection().query('INSERT INTO users SET ?', data, (err, result) => {
      console.log(error);
      err ? console.log(err) : res.render('../pages/success.ejs');
    })
  }
  
  
 })
module.exports = route;