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

const get_all_events = (req, res) => {
  res.send(events)
}

const create_event = (req, res) => {

}

const update_event = (req, res) => {
  
}

const delete_event = (req, res) => {

}

module.exports = {
  get_all_events,
  create_event,
  update_event,
  delete_event
}