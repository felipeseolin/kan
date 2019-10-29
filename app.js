const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, './src/views'));
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'b7c673bc498b874cb6a0e43ef9b86919',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());

mongoose.connect('mongodb://localhost:27017/kan', {
  useNewUrlParser: true,
});

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use('/', require('./src/routes'));

const port = process.env.PORT || 3000;
app.listen(port);
