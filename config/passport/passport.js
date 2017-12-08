const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database/database');


function isAdmin(admin) {
  if (admin === 'admin') {
    console.log('u are admin');
  } else {
    console.log('u are users');
  }
}

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (usernameField, passwordField, done) {
    db.getConnection().query(`SELECT email, password, roles from users where email = '${usernameField}' && password = '${passwordField}' && (roles='admin' || roles ='')`, (err, result) => {
      if (result.length === 0) {
        return done(err)
      }
      if (isAdmin(result[0].roles)) {
        console.log('u are admin');
        return done(null, result)
      } else {
        console.log('u are users');
        return done(null, result)
      }
      return done(null, false)
    })
  }
));