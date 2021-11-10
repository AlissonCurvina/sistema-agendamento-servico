require('dotenv').config({path: __dirname + '/.env'})
const passportSetup = require('./config/passport-setup')
const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')

const db = require('./controllers/dbController.js')
const app = express();

const PageRoutes = require('./routes/PageRoutes')
const UserRoutes = require('./routes/UserRoutes')
const ScheduleRoutes = require('./routes/ScheduleRoutes')
const ServiceRoutes = require('./routes/ServiceRoutes')
const AuthRoutes = require('./routes/AuthRoutes')
const CalendarRoutes = require('./routes/CalendarRoutes')
const keys = require('./config/keys');
const passport = require('passport')

db.connect()

app.listen(3000);
console.log('servidor reiniciado')

//listen for reqs
app.use(express.static('public'));

//view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

//body-parser
app.use(express.json());
//coolkie-parser
app.use(cookieParser());

app.use(PageRoutes)

app.use(UserRoutes)

app.use(ScheduleRoutes)

app.use(ServiceRoutes)

app.use(AuthRoutes)

app.use(CalendarRoutes)


app.use((req, res) => {
  res.render('404');
})