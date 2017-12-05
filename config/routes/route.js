const express = require('express');
const route = express.Router();
const users = require('../../app/models/users');

console.log(users.getOne())

route.get('/', (req, res) => {
  res.render('../pages/home.ejs')
})

route.get('/register', (req, res) => {
  res.render('../pages/register.ejs')
})

module.exports = route;