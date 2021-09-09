const Cookies = require('cookies');
const Service = require('../models/Service');
const User = require('../models/User');

const get_services = async (req, res) => {
  let currentUser

  const cookies = new Cookies(req, res)

  if (cookies.get('SESSION') != undefined) {
    currentUser = await User.findById(cookies.get('SESSION'))
  }

  const services = await Service.find({})

  const pageInfo = {
    pageName: 'Serviços',
    currentUser,
    services
  }

  res.render('services', {pageInfo})
}

const create_service = async (req, res) => {
  const myBool = req.body.status
  const newService = new Service({
    serviceName: req.body.serviceContent,
    price: req.body.priceContent,
    description: req.body.descriptionContent,
    durationTime: req.body.serviceDurationContent,
    status: req.body.checkContent ? '1' : '0'
  })

  newService.save()

  res.json({
    status: 200,
    message: 'Serviço criado'
  })
}

module.exports = {
  get_services,
  create_service
}