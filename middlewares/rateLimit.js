const rateLimit = require('express-rate-limit');

const limiterOptions = {
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    'Demasiadas solicitudes de esta IP, por favor intenta en una hora de nuevo',
};
const limiter = rateLimit(limiterOptions);

module.exports = limiter;
