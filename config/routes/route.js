const express = require('express');
const route = express.Router();
//require users, article, admin 
const usersController = require('../../app/controllers/usersController');
const articleController = require('../../app/controllers/articlesController');
const adminController = require('../../app/controllers/adminController');
// require express , passport
const expressValidator = require('express-validator');
const passport = require('passport');
//crypte
const bcrypt = require('bcrypt');
const saltRounds = 10;
// ADMIN
route.get('/dashboard', adminController.dashboard)
route.get('/newarticle', adminController.newarticle)
route.get('/published', adminController.published)
route.get('/updateStatus/:id', adminController.updateStatus)
route.post('/newArticle', adminController.getInsertArticle)
route.get('/draft', adminController.draft)
route.get('/modify/:id', adminController.getModifyArticle)
route.post('/modify/:id', adminController.modifyArticle)
route.get('/updateprofil', adminController.updateProfil)
route.get('/delete/:id', adminController.deleteArticle)
// FIN ADMIN

//FRONT
route.get('/', articleController.getLastArticles);
route.get('/articles', articleController.getAllArticles);
route.get('/articles/:id', articleController.getArticle);

//FIN FRONT

//debut insertion des données
const db = require('../database/database');
const isAdmin = require('../passport/passport');



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
      password:req.body.password
    } 

   bcrypt.hash(data.password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
     console.log(hash)
     db.getConnection().query('INSERT INTO users SET ?', data, (err, result) => {
        console.log(result);
        if (err) throw err
        const id = result.insertId
        db.getConnection().query(`SELECT id from users where id=${id}`, (err, users) => {
          req.login(users, (err) => {
            if(err) throw err
            res.redirect('/')
          })
        })
      })
    });
  }  
})

// PARTI LOGIN
route.post('/login',  
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

route.get('/login', (req, res) => {
  res.render('../pages/login.ejs');
})

route.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
})

passport.serializeUser(function (users, done) {
  done(null, users);
});

passport.deserializeUser(function (users, done) {
  done(null, users);
});
//END LOGIN


module.exports = route;