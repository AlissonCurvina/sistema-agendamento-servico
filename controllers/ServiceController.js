const Cookies = require('cookies');
const Service = require('../models/Service');
const User = require('../models/User');

const get_services = async (req, res) => {

  const services = await Service.find({})

  const pageInfo = {
    pageName: 'Serviços',
    services
  }

  res.render('services', {pageInfo})
}

const get_service = async (req, res) => {
  const services = await Service.findById(req.params.id)

  res.send(services)
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

const edit_service = async (req, res) => {
  const serviceId = req.params.id

  const currentService = await Service.findById(serviceId)

  const pageInfo = {
    pageName: 'Editar serviço',
    currentService
  }

  res.render('edit-service', {pageInfo})
}

const update_service = async (req, res) => {
  const newContent = req.body
  
  const updatedService = await Service.findByIdAndUpdate({
    _id: req.params.id
  },
    newContent, 
  {
    new: true,
    useFindAndModify: false
  })

  res.json({
    status: 200,
    message: 'Serviço atualizado'
  })
}

const delete_service = async (req, res) => {
  const result = await Service.findByIdAndRemove(req.body.id,{
    useFindAndModify: false
  })

  res.json({
    status: 200,
    message: 'Serviço removido'
  })
}

module.exports = {
  get_services,
  get_service,
  create_service,
  edit_service,
  update_service,
  delete_service
}