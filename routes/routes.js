const express = require('express');
const router = express.Router();
const Cookies = require('cookies');
const User = require('../models/User');

//listen for get requests
router.get('/', (req, res) => {
  //aqui vai o middleware que vai verificar as credenciais do usuário
  let cookies = new Cookies(req, res)

  if (cookies.get('SESSION') != undefined) {
    User.findById(cookies.SESSION)
      .then(result => {
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
  User.findOne({ userName: req.body.username })
  .exec()
  .then( result => {
    const currentUser = result
    if (currentUser.password === req.body.password) {
      let cookies = new Cookies(req, res)
  
      if (cookies.get('SESSION') == undefined) {
        cookies.set('SESSION', currentUser._id, {
          maxAge: 900000000,
          httpOnly: true
        })
        res.redirect('/')
      }
    } 
  })
  .catch( err=> console.log(err))
})

router.post('/cadastrar-usuario', (req, res) => {
  const user = new User({
    fantasyName: req.body.fantasyName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })

  user.save()
  .then((result) => {
    res.json({ status: 200 })
  })
  .catch(err => console.log(err))
})

router.get('/all-users', (req, res) => {
  User.find()
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

router.get('/meus-dados', (req, res) => {
  const cookie = new Cookies(req, res);
  const userId = cookie.get('SESSION');

  User.findById(userId)
    .then(result => {
      const user = result;
      res.render('info', { user });
    })

})

router.patch('/edit-info', async (req, res) => {
  const cookie = new Cookies(req, res);
  const userId = cookie.get('SESSION');

  let item;

  switch(req.body.resource) {
    case 'username':
    item = { username: req.body.value }
    break;
    case 'fantasyName':
    item = { fantasyName: req.body.value }
    break;
    case 'email':
    item = { email: req.body.value }
  }

  let result = await User.findByIdAndUpdate(userId, item, { new: true })

  console.log(result)
  
})

router.delete('/excluir-dados', (req, res) => {


  User.findByIdAndDelete(req.body.id)
  .then(result => {

    res.clearCookie('SESSION');
    res.json({status: 200, message: 'Usuário deletado'})
  })
})

router.get('/logout', (req, res) => {

  res.clearCookie('SESSION');
  res.redirect('/');
})

module.exports = router;