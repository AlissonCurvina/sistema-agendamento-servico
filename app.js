require('dotenv').config({path: __dirname + '/.env'})

const express = require('express');
const cookieParser = require('cookie-parser');

const db = require('./controllers/dbController.js')
const app = express();

const PageRoutes = require('./routes/PageRoutes')
const UserRoutes = require('./routes/UserRoutes')
const ScheduleRoutes = require('./routes/ScheduleRoutes')
const ServiceRoutes = require('./routes/ServiceRoutes')
const GapiRoutes = require('./routes/GapiRoutes')

db.connect()

app.listen(3000);
console.log('servidor reiniciado')

//listen for reqs
app.use(express.static('public'));

//view engine
app.set('view engine', 'ejs');

//body-parser
app.use(express.json());
//coolkie-parser
app.use(cookieParser());

app.use(PageRoutes)

app.use(UserRoutes)

app.use(ScheduleRoutes)

app.use(ServiceRoutes)

app.use(GapiRoutes)



app.use((req, res) => {
  res.render('404');
})