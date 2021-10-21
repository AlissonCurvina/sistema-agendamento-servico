const axios = require('axios').default
const {google} = require('googleapis')

const clientId = process.env.OAUTH_CLIENT_ID
const clientSecret = process.env.OAUTH_CLIENT_SECRET
const redirectURI = 'http://localhost:3000/get-access-token/'

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectURI
)

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/plus.login'
  ]
})

const getToken = async code => {
  const {tokens} = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens);

  console.log(tokens)
}

const get_google_consent_page = async (req, res) => {
  const response = await axios.post(url)

  res.send(response.data)
}

const get_access_token = async (req, res) => {
  getToken(req.query.code)
}

module.exports = {
  get_google_consent_page,
  get_access_token
}