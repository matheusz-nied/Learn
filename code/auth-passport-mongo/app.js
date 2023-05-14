const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const openRouter = require('./routes/open');

function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login?fail=true');
}

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const MongoStore = require("connect-mongo")
require('./auth')(passport);
app.use(session({  
  store: MongoStore.create({
    autoRemove: 'native',
    mongoUrl: process.env.MONGO_CONNECTION,
    dbName: process.env.MONGO_DB,
    ttl: 15 // 30 min sessão
  }),

  secret: process.env.SESSION_SECRET,//configure um segredo seu aqui,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 15* 1000 }//30min
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', loginRouter);
app.use('/open', openRouter);
app.use('/users',  usersRouter);
app.use('/', authenticationMiddleware,  indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;