const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Cookies = require('cookies');

const User = require('./models/User');
const routes = require('./routes/routes');

//express app 
const app = express();

const dbURI = 'mongodb+srv://admin:senha@cluster0.sh90l.mongodb.net/sasCalendar?retryWrites=true&w=majority'

const connectToServer = async credentials => {
  try {
    let res = await mongoose.connect(dbURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  }
  catch (err) {
    console.log(mongoose.err)
  }
}

connectToServer(dbURI)

app.listen(3000);

//listen for reqs
app.use(express.static('public'));

//view engine
app.set('view engine', 'ejs');

//body-parser
app.use(express.json());
//coolkie-parser
app.use(cookieParser());

app.use(routes)

app.use((req, res) => {
  res.render('404');
})


