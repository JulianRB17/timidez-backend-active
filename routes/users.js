const usersRoute = require('express').Router();
const { celebrateCreateUserMiddleware } = require('../middlewares/celebrate');

const {
  createUser,
  // getUsers,
  // deleteUsers,
} = require('../controllers/usersController');

// usersRoute.get('/', getUsers);
usersRoute.post('/', celebrateCreateUserMiddleware(), createUser);
// usersRoute.delete('/:id', deleteUsers);

module.exports = { usersRoute };
