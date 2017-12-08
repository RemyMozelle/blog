const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database/database');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (usernameField, passwordField, done) {
    db.getConnection().query(`SELECT email, password, role from users where email = '${usernameField}' && password = '${passwordField}'`, (err, result) => {
      if (result.length === 0) {
        return done(err)
      } else {
        return done(null, result)
      }
      return done(null, false)
    })
  }
));