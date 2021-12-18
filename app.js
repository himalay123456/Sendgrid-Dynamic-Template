var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { mongoInit } = require('./config/dbConnection')


var indexRouter = require('./routes/v1/index');
var usersRouter = require('./routes/v1/users');

var app = express();
mongoInit()


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);
app.use('/api/v1/user', usersRouter);

//setting up custom error message for routes
app.use((req, res, next) => {
	const error = new Error('This APIs does not exist')
	error.status = 404
	next(error)
})

//cors
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key')
	if (req.method == 'OPTIONS') {
		res.status(200).end()
	} else {
		next()
	}
})


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
