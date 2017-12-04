const dotenv = require('dotenv').config({ path: '.env' })
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', 'app/views/pages');

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./config/routes/route'));

app.listen(process.env.PORT);