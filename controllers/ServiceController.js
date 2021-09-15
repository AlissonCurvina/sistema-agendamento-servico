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

const edit_service = async (req, res) => {
  const serviceId = req.params.id

  const translateTimeTable = [
    [1, '0h30m'],
    [2, '1h00m'],
    [3, '1h30m'],
    [4, '2h00m']
  ]

  let currentUser

  const cookies = new Cookies(req, res)

  if (cookies.get('SESSION') != undefined) {
    currentUser = await User.findById(cookies.get('SESSION'))
  }

  if(currentUser) {
    const currentService = await Service.findById(serviceId)

    const translatedTime = translateTimeTable.find( item => {
      return item[0] == currentService.durationTime
    })

    const durationTime = translatedTime[1]
    console.log(durationTime)

    const pageInfo = {
      pageName: 'Editar serviço',
      currentUser,
      currentService,
      durationTime
    }

    res.render('edit-service', {pageInfo})
  }
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

  console.log(newContent)


  /*   .then(()=>{
    res.sendStatus({message:"success"});
  })
    .catch(err => {
    res.status(500).send(err.message);
  }) */
}

const delete_service = async (req, res) => {
  const result = await Service.findByIdAndRemove(req.body.id,{
    useFindAndModify: false
  })
  console.log(result)
  res.json({
    status: 200,
    message: 'Serviço removido'
  })
}

module.exports = {
  get_services,
  create_service,
  edit_service,
  update_service,
  delete_service
}

