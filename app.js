const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const { usersRoute } = require('./routes/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimit');
const { dataRoute } = require('./routes/data');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  // MANDARME MAIL AQUÍ AUTOMATIZAR EL RESETEO DEL SERVER
  console.log('UNCAUGHT EXCPETION... app cerrándose');
  console.log(err.name, err.message);
  process.exit(1);
});

const { PORT = 3000, NODE_ENV } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/timidez');
app.use(helmet());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(mongoSanitize());

const corsOptions = { origin: 'localhost', optionsSuccessStatus: 200 };
app.use(cors({ corsOptions }));
app.use(xss());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a apagarse');
  }, 0);
});

app.use(limiter);
app.use('/users', usersRoute);
app.use('/data', dataRoute);

app.use(errorLogger);
// app.use(errors());

app.all('*', (req, res, next) => {
  next(new AppError(`No se encuentra ${req.originalUrl} en el servidor`, 404));
});

app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
  console.log(NODE_ENV, PORT);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION... app cerrándose');
  console.log(err.name, err.message, err);
  server.close(() => {
    process.exit(1);
  });
});
