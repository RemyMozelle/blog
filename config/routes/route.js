const express = require('express');
const route = express.Router();
//require users, article, admin 
const usersController = require('../../app/controllers/usersController');
const articleController = require('../../app/controllers/articlesController');
const adminController = require('../../app/controllers/adminController');
// require express , passport
const expressValidator = require('express-validator');
const passport = require('passport');


// ADMIN
route.get('/dashboard', adminController.dashboard)
route.get('/newarticle', adminController.newarticle)
route.get('/published', adminController.publish)
route.get('/draft', adminController.draft)
route.get('/updateprofil', adminController.updateProfile)
// FIN ADMIN

//PARTI FRONT
route.get('/', articleController.getAllArticle);
//FIN PARTI FRONT

//debut insertion des données
const db = require('../database/database');

route.get('/register', (req, res) => {
  res.render('../pages/register.ejs')
})
route.post('/register', (req, res) => {

  req.checkBody('name', 'le prenom ne peut être vide').notEmpty()
  req.checkBody('surname', 'le nom ne peut être vide').notEmpty()
  req.checkBody('email', 'l\'email ne peut être vide').notEmpty()
  req.checkBody('password', 'le mot de passe ne peut être vide').notEmpty()

  const error = req.validationErrors();
  
  if (error) {
    res.render('../pages/register.ejs', {
      errors: error
    })
  } else {

    const data = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password
    }

    db.getConnection().query('INSERT INTO users SET ?', data, (err, result) => {
      if (err) throw err
      const id = result.insertId
      db.getConnection().query(`SELECT id from users where id=${id}`, (err, users) => {
        req.login(users, (err) => {
          if(err) throw err
          res.redirect('/')
        })
      })
    })
  }  
})

route.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
  })
);

route.get('/login', (req, res) => {
  res.render('../pages/login.ejs');
})

passport.serializeUser(function (users, done) {
  done(null, users);
});

passport.deserializeUser(function (users, done) {
  done(null, users);
});
module.exports = route;