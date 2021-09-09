const Cookies = require('cookies');
const User = require('../models/User');

const get_index = async (req, res) => {
  const cookies = new Cookies(req, res)

  if (cookies.get('SESSION') != undefined) {
    const currentUser = await User.findById(cookies.get('SESSION'))

    const pageInfo = {
      pageName: 'Sistema de agendamento de serviços',
      currentUser
    }
    res.render('index', {pageInfo})
    return
  }
  res.render('login');
}

const get_about_page = (req, res) => {
  const pageInfo = {
    pageName: 'Sobre'
  }
  res.render('about', {pageInfo});
}

const get_create_user_page = (req, res) => {
  const pageInfo = {
    pageName: 'Cadastrar usuário'
  }
  res.render('create-user', {pageInfo});
}

const login = async (req, res, next) => {
  let cookies = new Cookies(req, res)

  if(cookies.get('SESSION')) {
    res.clearCookie('SESSION')
  }

  const userLoginData = req.body.username
  const userPassword = req.body.password

  
  
  try {
    if(!userLoginData) {
      res.json({
        status: 401,
        type: 'user',
        message: 'Digite um nome de usuário'
      })
      return
    }

    if(!userPassword) {
      res.json({
        status: 401,
        type: 'password',
        message: 'Digite a senha'
      })
      return
    }

    const currentUser = await User.findOne({ userName: userLoginData }).exec()
    const loggedUser = await currentUser

    if(!loggedUser) {
      res.json({
        status: 401,
        type: 'user',
        message: 'Usuário inexistente'
      })
      return
    }

    if(loggedUser.password != userPassword) {
      res.json({
        status: 401,
        type: 'password',
        message: 'Senha incorreta'
      })
      return
    }

    if(loggedUser) {
      cookies.set('SESSION', loggedUser._id, 
      {
        maxAge: 9000000000,
        httpOnly: true
      })
      res.json({
        status: 200,
        message: `Bem vindo, ${loggedUser.userName}`
      })
    }
  } catch(err) {
    console.log(err)
  }
}

const create_user = async (req, res) => {
  const user = new User({
    fantasyName: req.body.fantasyName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })

  const createdUser = await user.save()

  res.json({ status: 200 })
}

const get_my_data = async (req, res) => {
  const cookie = new Cookies(req, res);
  const userId = cookie.get('SESSION');

  const currentUser = await User.findById(userId)

  const pageInfo = {
    pageName: 'Meus dados',
    currentUser
  }

  res.render('info', {pageInfo})
}
const edit_info = async (req, res) => {
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
}

const delete_user = (req, res) => {
  const cookie = new Cookies(req, res);
  const userId = cookie.get('SESSION');

  User.findByIdAndDelete(userId)
  .then(result => {

    res.clearCookie('SESSION');
    res.json({
      status: 200, 
      message: 'Usuário deletado'
    })
  })
}

const logout = (req, res) => {
  res.clearCookie('SESSION');
  res.redirect('/');
}

module.exports = 
{
  get_index,
  get_about_page,
  get_create_user_page,
  login,
  create_user,
  get_my_data,
  edit_info,
  delete_user,
  logout
}