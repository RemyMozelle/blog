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

module.exports = route;