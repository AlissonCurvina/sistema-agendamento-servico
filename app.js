const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

//express app 
const app = express();

const dbURI = 'mongodb+srv://admin:senha@cluster0.sh90l.mongodb.net/sasCalendar?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then( res => app.listen(3000))
  .catch( err => console.log(err))

//listen for reqs
app.use(express.static('public'));

//view engine
app.set('view engine', 'ejs');

//body-parser
app.use(express.json())

//listen for get requests
app.get('/', (req, res) => {
  //aqui vai o middleware que vai verificar as credenciais do usuário
  let isUserLogged = false
  if(isUserLogged) {
    res.render('index');
    return;
  }
  res.render('login');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/cadastrar-usuario', (req, res) => {
  console.log('fununciou');
  res.render('create-user');
})

app.post('/', async (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)
})

app.use((req,res) => { 
  res.render('404');
})