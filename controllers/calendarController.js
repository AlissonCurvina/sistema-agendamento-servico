const {google} = require('googleapis');
const { Error } = require('mongoose');
require('dotenv').config();

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



const createEvent = async (req, res) => {
  try {
    let response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: req.body.event
    })

    if (response['status'] == 200 && response['statusText'] === 'OK') {
      return 1
    } else {
      return 0
    }
  } 
  catch (error) {
    console.log(`Error at insertEvent --> ${error}`)
    return 0
  }
}

const get_all_events = async (req, res) => {

  // async (dateTimeStart, dateTimeEnd)

  try {
    let response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: '2021-11-08T00:00:00.000Z',
      timeMax: '2021-12-01T00:00:00.000Z',
      timeZone: 'America/Sao_Paulo'
    })
  
    let items = response['data']['items']

    return items
  } 
  catch (error) {
    console.log(`Error at getEvents --> ${error}`)
    return 0
  }
}

const deleteEvent = async (eventId) => {

  try {
    let response = await calendar.events.delete({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId
    })

    if (response.data === '') {
      return 1
    } else {
      return 0
    }
  } 
  catch (error) {
    console.log(`Error at deleteEvent --> ${error}`);
    return 0
  }
}

const get_free_busy_info = async (req, res) => {

  try {
    let timeMin = '2021-11-10T00:00:00.000Z'
    let timeMax = '2021-11-10T23:59:59.000Z'
    const results = await calendar.freebusy.query({
      requestBody: {
        'calendarExpansionMax': 1,
        'groupExpansionMax': 1,
        'items': [{id: calendarId}],
        'timeMin': timeMin,
        'timeMax': timeMax,
        'timeZone': 'UTC-3'
      }
    })

    return results
  }
  catch(err) {
    console.log('Erro aqui nessa porra -->' + err)
  }

  
  
}

const updateEvent = async (req, res) => {

}

// Get date-time string for calendar
const dateTimeForCalendar = () => {

  let date = new Date();

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
  }

  let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000-00:00`;

  let event = new Date(Date.parse(newDateTime));

  let startDate = event;
  // Delay in end time is 1
  let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

  return {
    'start': startDate,
    'end': endDate
  }
}

// let dateTime = dateTimeForCalendar();

// // Event for Google Calendar
/* let event = {
  'summary': `This is the summary.`,
  'description': `This is the description.`,
  'start': {
    'dateTime': dateTime['start'],
    'timeZone': 'America/Sao_Paulo'
  },
  'end': {
    'dateTime': dateTime['end'],
    'timeZone': 'America/Sao_Paulo'
  }
} */
// let start = '2020-10-03T00:00:00.000Z';
// let end = '2020-10-04T00:00:00.000Z';

module.exports = {
  get_all_events,
  get_free_busy_info
}