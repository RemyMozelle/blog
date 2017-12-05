const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
  res.render('home.pug')
})

route.get('/register', (req, res) => {
  res.render('register.pug')
})

module.exports = route;