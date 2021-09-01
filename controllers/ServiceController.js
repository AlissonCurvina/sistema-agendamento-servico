const Cookies = require('cookies');
const Service = require('../models/Service');

const get_services = (req, res) => {
  res.render('services')
}

const create_service = (req, res) => {
  
}

module.exports = {
  get_services,
  create_service
}