const express = require('express');
const app = express();
const dotenv = require('dotenv').config({ path: '.env' });
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
//require pour la session / validation des données
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const expressValidator = require('express-validator');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./config/database/database')
//recupère la strategie de passport
const passports = require('./config/passport/passport');
const sessionStore = new MySQLStore(db.getOption());
//upload file
const fileUpload = require('express-fileupload');

app.set('view engine', 'ejs');
app.set('views', './app/views/layouts');

app.use(expressLayouts);
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public/'));
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
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./config/routes/route'));
app.listen(process.env.PORT);