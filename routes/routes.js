const express = require('express');
const router = express.Router();
const Cookies = require('cookies');
const User = require('../models/User');

//listen for get requests
router.get('/', (req, res) => {
  //aqui vai o middleware que vai verificar as credenciais do usuário
  let cookies = new Cookies(req, res)

  console.log()

  if(cookies.get('SESSION') != undefined) {
    User.findById(cookies.SESSION)
      .then( result => {
        res.render('index', { user: result });
      })
    return;
  }
  res.render('login'); 
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/cadastrar-usuario', (req, res) => {
  res.render('create-user');
})

router.post('/', async (req, res, next) => {
  User.find({ userName: req.body.username })
    .exec()
    .then( result => {
      const currentUser = result[0]

      if(currentUser.password === req.body.password) {
        let cookies = new Cookies(req, res)

        if(cookies.get('SESSION') == undefined) {
          cookies.set('SESSION', currentUser._id, {
            maxAge: 900000,
            httpOnly: true
          }) 
          res.redirect('/')
        }
      }     
  })
})

router.post('/cadastrar-usuario',  (req, res) => {
  console.log(req.body)

  const user = new User({
    fantasyName: req.body.fantasyName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })

  user.save()
    .then( (result) => {
      res.json({status: 200})
    })
    .catch( err => console.log(err) )
})

router.get('/all-users', (req, res) => {
  User.find()
    .then( result => res.send(result) )
    .catch( err => console.log(err))
})

router.get('/logout', (req, res) => {
  
  res.clearCookie('SESSION');
  res.redirect('/');
})

module.exports = router;