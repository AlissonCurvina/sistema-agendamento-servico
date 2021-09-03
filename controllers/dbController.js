const mongoose = require('mongoose');
const { connect } = require('../routes/UserRoutes');
require('dotenv').config({path: __dirname + '/.env'})

const db = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  domain: process.env.DB_DOMAIN,
  name: process.env.DB_NAME,

  connect() {
    const dbURI = `mongodb+srv://${this.user}:${this.password}@${this.domain}/${this.name}?retryWrites=true&w=majority`
    mongoose.connect(dbURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then( res => {
      return
    })
  }
}

module.exports = db