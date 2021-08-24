const Cookies = require('cookies');
const User = require('../models/User');

const get_index = (req, res) => {
  let cookies = new Cookies(req, res)

  if (cookies.get('SESSION') != undefined) {
    User.findById(cookies.SESSION)
      .then(result => {
        res.render('index', { user: result });
      })
    return;
  }
  res.render('login');
}

const get_about_page = (req, res) => {
  res.render('about');
}

const get_create_user_page = (req, res) => {
  res.render('create-user');
}

const login = async (req, res, next) => {
  User.findOne({ userName: req.body.username })
  .exec()
  .then( result => {
    const currentUser = result
    if (currentUser.password === req.body.password) {
      let cookies = new Cookies(req, res)
  
      if (cookies.get('SESSION') == undefined) {
        cookies.set('SESSION', currentUser._id, {
          maxAge: 900000000,
          httpOnly: true
        })
        res.redirect('/')
      }
    } 
  })
  .catch( err=> console.log(err))
}

const create_user = (req, res) => {
  const user = new User({
    fantasyName: req.body.fantasyName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })

  user.save()
  .then((result) => {
    res.json({ status: 200 })
  })
  .catch(err => console.log(err))
}

const get_my_data = (req, res) => {
  const cookie = new Cookies(req, res);
  const userId = cookie.get('SESSION');

  User.findById(userId)
  .then(result => {
    const user = result;
    res.render('info', { user });
  })
}

const edit_info = async (req, res) => {
  const cookie = new Cookies(req, res);
  const userId = cookie.get('SESSION');

  let item;

  switch(req.body.resource) {
    case 'username':
    item = { username: req.body.value }
    break;
    case 'fantasyName':
    item = { fantasyName: req.body.value }
    break;
    case 'email':
    item = { email: req.body.value }
  }

  let result = await User.findByIdAndUpdate(userId, item, { new: true })
}

const delete_user = (req, res) => {
  User.findByIdAndDelete(req.body.id)
  .then(result => {

    res.clearCookie('SESSION');
    res.json({status: 200, message: 'Usuário deletado'})
  })
}

const logout = (req, res) => {
  res.clearCookie('SESSION');
  res.redirect('/');
}

module.exports = 
{
  get_index,
  get_about_page,
  get_create_user_page,
  login,
  create_user,
  get_my_data,
  edit_info,
  delete_user,
  logout
} 