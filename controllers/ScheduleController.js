require('dotenv').config({path: __dirname + '/.env'})

const Service = require('../models/Service')
const nodeMailer = require('nodemailer')
const calendarController = require('./calendarController')
const serviceController = require('./serviceController')
const {google} = require('googleapis');

const createDateTime = dueTime => {

  const date = new Date(dueTime)
  const endTime = new Date(date.setHours(date.getHours() + 1)).toISOString()

  return {
    'start': dueTime,
    'end': endTime
  }

  /* let date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  } */
/* 
  let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

  let event = new Date(Date.parse(newDateTime));

  let startDate = event;
  // Delay in end time is 1
  let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

  return {
    'start': startDate,
    'end': endDate
  } */
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
    'summary': `${service.serviceName} | ${req.body.clientName}`,
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

  try {
    let response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: newEvent
    })

    if (response['status'] == 200 && response['statusText'] === 'OK') {
      console.log('Evento criado')
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