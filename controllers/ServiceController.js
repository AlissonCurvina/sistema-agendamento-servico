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

const create_service = async (req, res) => {
  const myBool = req.body.status
  const newService = {
    serviceName: req.body.serviceContent,
    price: req.body.priceContent,
    description: req.body.description,
    durationTime: req.body.description,
    status: req.body.checkContent ? '1' : '0'
  }
  console.log(newService)
}

module.exports = {
  get_services,
  create_service
}