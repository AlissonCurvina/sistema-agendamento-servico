const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  time: {
    type: Object,
    required
  },
  clientName: {
    type: String,
    required
  },
  clientEmail: {
    type: String,
    required
  },
  clientPhone: {
    type: String,
    required
  },
  service: {
    type: Object,
    required
  },
  eventIdOnGoogleCalendar: {
    type: String,
    required
  }
}, {timestamps: true})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event