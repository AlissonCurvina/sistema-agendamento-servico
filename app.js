require('dotenv').config({path: __dirname + '/.env'})

const express = require('express');
const cookieParser = require('cookie-parser');
const Cookies = require('cookies');

const db = require('./controllers/dbController.js')

const PageRoutes = require('./routes/PageRoutes')

const User = require('./models/User');
const UserRoutes = require('./routes/UserRoutes');

const ScheduleRoutes = require('./routes/ScheduleRoutes')

const ServiceRoutes = require('./routes/ServiceRoutes');

//express app 
const app = express();

db.connect()

app.listen(3000);

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

app.use((req, res) => {
  res.render('404');
})