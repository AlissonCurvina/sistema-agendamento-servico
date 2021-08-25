const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Cookies = require('cookies');
require('dotenv').config({path: __dirname + '/.env'})

const dbUser = process.env.USER;
const dbPassword = process.env.PASSWORD;
const dbDomain = process.env.DB_DOMAIN;
const dbName = process.env.DB_NAME

const User = require('./models/User');
const UserRoutes = require('./routes/UserRoutes');

//express app 
const app = express();

const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbDomain}/${dbName}?retryWrites=true&w=majority`

const connectToServer = dbURI => {
  mongoose.connect(dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then( res => {
    return
  })
}

connectToServer(dbURI);

app.listen(3000);

//listen for reqs
app.use(express.static('public'));

//view engine
app.set('view engine', 'ejs');

//body-parser
app.use(express.json());
//coolkie-parser
app.use(cookieParser());

app.use(UserRoutes)

app.use((req, res) => {
  res.render('404');
})