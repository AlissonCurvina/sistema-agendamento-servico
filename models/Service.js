const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema({
  serviceName: {
    type: String,
    required: true
  },
  price: {
    type:  Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  durationTime: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service