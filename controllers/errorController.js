const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalido ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// const handleDuplicateFieldsDB = (err) => {
//   const value = err.keyAlgo;
//   const message = `Elemento duplicado: ${value}. Por favor usa otro correo.`;
//   return new AppError(message, 400);
// };

const handleValidationErrorDB = (err) => {
  const message = `Error de validación: email inválido.`;
  return new AppError(message, 400);
};

const sendErroDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error: ', err);

    res.status(500).json({
      status: 'error',
      message: 'Algo salió mal',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErroDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    // if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.message === 'Validation failed')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
