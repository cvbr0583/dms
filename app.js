import createError from 'http-errors'
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import mongoose from 'mongoose';
import routes from './routes/index.route'
const { validate, ValidationError, Joi } = require('express-validation');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//importing the routes from routes/index.js
app.use('/api', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use((err, req, res, next) => {
  console.log(err);
  // customize Joi validation errors
  // if (err.isJoi) {
  //   err.message = err.errors.map(e => e.messages).join("; ");
  //   err.status = 400;
  // }
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }
  return res.status(500).json({ message: err.message })
  next(err);
});


const mongoUri = process.env.MONGO_HOST;
mongoose.connect(mongoUri, { keepAlive: 1 });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// global variable to hold blacklist tokens
global.blackListTokens = []

module.exports = app;
