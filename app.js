const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
let isUserLogged = true

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

  catch(err) {
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
app.use(express.json())

//listen for get requests
app.get('/', (req, res) => {
  //aqui vai o middleware que vai verificar as credenciais do usuário
  if(isUserLogged) {
    res.render('index', {user: 'Canela vendedor de kisuco'});
    return;
  }
  res.render('login');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/cadastrar-usuario', (req, res) => {
  res.render('create-user');
})

app.post('/', async (req, res) => {
  console.log('burro')
})

app.post('/cadastrar-usuario',  (req, res) => {
  console.log(req.body)

  const user = new User({
    fantasyName: req.body.fantasyName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })

  user.save()
    .then( (result) => {
      isUserLogged = true
      res.json({status: 200})
    })
    .catch( err => console.log(err) )
})

app.use((req,res) => { 
  res.render('404');
})