const Service = require('../models/Service')

const events = [
  {
    id: 999,
    title: 'Disponível',
    start: '2021-09-16T17:00:00'
  },
  {
    id: 999,
    title: 'Corte',
    start: '2021-09-16T12:00:00',
  },
  {
    id: 999,
    title: 'Disponível',
    start: '2021-09-20T15:00:00'
  },
  {
    id: 999,
    title: 'Corte',
    start: '2021-09-05T12:00:00',
  },
  {
    id: 999,
    title: 'Disponível',
    start: '2021-09-02T20:00:00'
  },
  {
    id: 999,
    title: 'Corte',
    start: '2021-09-07T09:00:00',
  }
]

const get_all_events = async (req, res) => {
  res.send(events)
}

const create_event = async (req, res) => {

}

const get_available_hours = async (req, res) => {

  const availableHours = [
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '17:00',
    '18:00'
  ]

  console.log(req.body)
  res.send({
    status: 200,
    availableHours
  })
}

const update_event = async (req, res) => {
  
}

const delete_event = async (req, res) => {

}

module.exports = {
  get_all_events,
  create_event,
  get_available_hours,
  update_event,
  delete_event
}