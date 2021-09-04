const Cookies = require('cookies');
const Service = require('../models/Service');
const User = require('../models/User');

const get_services = async (req, res) => {

  const cookies = new Cookies(req, res)

  if (cookies.get('SESSION') != undefined) {
    const currentUser = await User.findById(cookies.get('SESSION'))

    const pageInfo = {
      pageName: 'Serviços',
      currentUser
    }
    res.render('services', {pageInfo})
  }
}

const create_service = (req, res) => {
  
}

module.exports = {
  get_services,
  create_service
}