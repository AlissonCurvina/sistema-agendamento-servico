require('dotenv').config({path: __dirname + '/.env'})

const path = require('path')

console.log(path)

const Service = require('../models/Service')
const nodeMailer = require('nodemailer')

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
  console.log(req.body)
}

const get_available_hours = async (req, res) => {

  const availableHours = [
    '07:00:00',
    '08:00:00',
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '17:00:00',
    '18:00:00'
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

const send_confirmation_email = async (req, res) => {
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    user: 'sascalendaracc@gmail.com',
    pass: process.env.EMAIL_PASS
  }
  
  const transporter = nodeMailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: false,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  
  const run = async () => {
    const mailSent = await transporter.sendMail({
      text: 'Corpo do e-mail',
      subject: 'Assunto do e-mail',
      from: 'Equipe Sas Calendar - <sascalendaracc@gmail.com>',
      to: 'alisson.curvina@gmail.com'
    })
  }
  run()
}

module.exports = {
  get_all_events,
  create_event,
  get_available_hours,
  update_event,
  delete_event,
  send_confirmation_email
}