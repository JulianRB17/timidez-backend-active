const dataRoute = require('express').Router();
const { getData } = require('../controllers/dataController');

dataRoute.get('/', getData);

module.exports = { dataRoute };
