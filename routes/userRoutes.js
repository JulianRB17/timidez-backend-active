const usersRoute = require('express').Router();
const { celebrateCreateUserMiddleware } = require('../middlewares/celebrate');

const { createUser } = require('../controllers/usersController');

usersRoute.post('/users', celebrateCreateUserMiddleware(), createUser);

module.exports = { usersRoute };
