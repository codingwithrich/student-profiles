
var compression = require('compression');
var helmet = require('helmet');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const compression = require('compression');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);
app.use(express.static('public'));

module.exports = app;