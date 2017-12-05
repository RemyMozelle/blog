const dotenv = require('dotenv').config({ path: '.env' })
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('views', './app/views/layouts');

app.use(expressLayouts);
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./config/routes/route'));

app.listen(process.env.PORT);