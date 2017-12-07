const express = require('express');
const app = express();
const dotenv = require('dotenv').config({ path: '.env' });
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/database/database');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const expressValidator = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const sessionStore = new MySQLStore(db.getOption());

app.set('view engine', 'ejs');
app.set('views', './app/views/layouts');

app.use(expressLayouts);
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator())
app.use(session({
  secret: 'erazer33e',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  //cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (usernameField, passwordField, done) {
    db.getConnection().query(`SELECT email, password from users where email = '${usernameField}' && password = '${passwordField}'`, (err, result) => {
      if (result.length === 0) {
        return done(err)
      } else {
        return done(null, result)
      }
      return done(null, false)
    })
  }
));
app.use(require('./config/routes/route'));
app.listen(process.env.PORT);