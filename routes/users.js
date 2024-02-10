const usersRoute = require('express').Router();
const { celebrateCreateUserMiddleware } = require('../middlewares/celebrate');

const { createUser, getUsers } = require('../controllers/usersController');

usersRoute.get('/', getUsers);
usersRoute.post('/', celebrateCreateUserMiddleware(), createUser);

module.exports = { usersRoute };
