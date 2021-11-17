require('dotenv').config({path: __dirname + '/.env'})

const Service = require('../models/Service')
const nodeMailer = require('nodemailer')
const calendarController = require('./calendarController')
const serviceController = require('./serviceController')

const {google} = require('googleapis');
const TIMEOFFSET = '-03:00';

  const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
  const calendarId = process.env.CALENDAR_ID;

  // Google calendar API settings
  const SCOPES = 'https://www.googleapis.com/auth/calendar';

  const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
  );

  const calendar = google.calendar({
    version : 'v3',
    auth: auth
  });

const createDateTime = dueTime => {

  const date = new Date(dueTime)

  const convertedDate = new Date(date.setHours(date.getHours() + 3))

  const endTime = new Date(date.setHours(date.getHours() + 1))
  
  return {
    'start': convertedDate.toISOString(),
    'end': endTime.toISOString()
  }
}

const get_all_events = async (req, res) => {
  const events = calendarController.get_all_events()

  events.then( result => {
    res.send(result)
  })
}

const create_event = async (req, res) => {
  console.log(req.body)
  const service = await Service.findById(req.body.service)

  const dateTime = createDateTime(req.body.dueTime)

  console.log(dateTime)

  const newEvent = {
    'summary': `${service.serviceName} | ${req.body.clientName} | ${req.body.clientPhone} | ${req.body.clientEmail}`,
    'description': `${req.body.clientName} agendou ${service.serviceName}`,
    'start': {
      'dateTime': dateTime.start,
      'timeZone': 'America/Sao_Paulo'
    },
    'end': {
      'dateTime': dateTime.end,
      'timeZone': 'America/Sao_Paulo'
    }
  }

  try {
    let response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: newEvent
    })

    if (response['status'] == 200 && response['statusText'] === 'OK') {
      console.log(response)
      res.send(response)
    } else {
      console.log('Deu ruim')
    }
  } 
  catch (error) {
    console.log(`Error at insertEvent --> ${error}`)
    return 0
  }
}

const get_available_hours = async (req, res) => {
  //const availableHours = await calendarController.get_free_busy_info()

  const availableHours = [
    '07:00:00',
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '14:00:00',
    '15:00:00',
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

const edit_event = async (req, res) => {

  try {
    let response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: '2021-11-01T00:00:00.000Z',
      timeMax: '2021-12-01T00:00:00.000Z',
      timeZone: 'America/Sao_Paulo'
    })
  
    let items = response['data']['items']

    res.send(items)
    return
  } 
  catch (error) {
    console.log(`Error at getEvents --> ${error}`)
    return 0
  }
  
}

const delete_event = async (req, res) => {
  try {
    let response = await calendar.events.delete({
      auth: auth,
      calendarId: calendarId,
      eventId: req.body.eventId
    })
  } 
  catch(err) {
    console.log(`Houve um erro --> ${err}`)
  }

  res.send({
    status: 200,
    message: 'Agendamento cancelado.'
  })
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
  edit_event,
  get_available_hours,
  update_event,
  delete_event,
  send_confirmation_email
}