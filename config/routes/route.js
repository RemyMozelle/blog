const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
  res.render('home.pug')
})

module.exports = route;