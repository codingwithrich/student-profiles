var helmet = require('helmet');

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');

const userRoutes = require('./routes/userController');
const studentProfileDetails = require('./routes/studentProfileController');
const studentProfileForm = require('./routes/profileFormsController');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "secret",
    cookie: { secure: true},
  }))
app.use(compression());
app.use(helmet());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/', userRoutes);
app.use('/', studentProfileDetails);
app.use('/', studentProfileForm);

module.exports = app;