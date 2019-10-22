const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, './src/views'));
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost:27017/kan', {
  useNewUrlParser: true,
});

app.use('/', require('./src/routes'));

app.listen(3000);
