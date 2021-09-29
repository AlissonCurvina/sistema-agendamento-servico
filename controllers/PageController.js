const Cookies = require('cookies');
const User = require('../models/User');
const Service = require('../models/Service')

const get_index_page = async (req, res) => {
  const cookies = new Cookies(req, res)

  if (cookies.get('SESSION') != undefined) {
    const currentUser = await User.findById(cookies.get('SESSION'))

    const services = await Service.find({})

    console.log(services)

    const pageInfo = {
      pageName: 'Sistema de agendamento de serviços',
      currentUser,
      services
    }
    
    res.render('index', {pageInfo})
    return
  }
  res.render('login');
}

const get_create_user_page = (req, res) => {
  const pageInfo = {
    pageName: 'Cadastrar usuário'
  }
  res.render('create-user', {pageInfo});
}

const get_data_page = async (req, res) => {
  const cookie = new Cookies(req, res);
  const userId = cookie.get('SESSION');

  const currentUser = await User.findById(userId)

  const pageInfo = {
    pageName: 'Meus dados',
    currentUser
  }

  res.render('info', {pageInfo})
}

const get_about_page = (req, res) => {
  const pageInfo = {
    pageName: 'Sobre'
  }
  res.render('about', {pageInfo});
}

module.exports = {
  get_index_page,
  get_data_page,
  get_about_page,
  get_create_user_page
}