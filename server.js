if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const nocache = require('nocache');



app.set('view-engine', 'ejs');
app.use(nocache());
app.use(express.json());
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.errorMessages = req.flash('error');
  next();
});


const adminname = "vaishnnav";
const adminpassword = "hello@123";

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.body.name });
});

app.get('/login', notAuthenticate, (req, res) => {
  res.render('login.ejs')
});

app.post('/login', (req, res) => {

  const username = req.body.name;
  const password = req.body.password;

  if (username === adminname && password === adminpassword) {

    req.session.user = { username: adminname, password: adminpassword };
    return res.redirect('/');
  } else {
    req.flash('error', 'Invalid username or password');
    res.redirect('/login');
  }

});

app.post('/logout', (req, res) => {
  req.session.user = undefined;
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
  if (!isAuthenticate(req)) {
    return res.redirect('/login');
  }

  next();
}

function notAuthenticate(req, res, next) {
  if (isAuthenticate(req)) {
    return res.redirect('/');
  }
  next();
}

function isAuthenticate(req) {
  return req.session.user !== undefined;
}



const port = process.env.port || 3001;
app.listen(port, () => console.log(`Server is started at the port ${port}`));