const dotenv = require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

//validations, session
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');


app.set('view engine', 'ejs');
app.set('views', './app/views/layouts');
app.use(expressLayouts);
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// session validation
app.use(expressValidator())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./config/routes/route'));

app.listen(process.env.PORT);