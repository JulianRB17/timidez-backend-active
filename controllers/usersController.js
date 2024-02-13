const AppError = require('../utils/appError');

const User = require('../models/user');
const activeCampaignApi = require('../utils/activeCampaign');
require('dotenv').config();

const catchAsync = require('./../utils/catchAsync');

const getUsers = catchAsync(async function (req, res, next) {
  const users = await User.find({});
  res.json({
    length: users.length,
    users: users,
  });
});

const createUser = catchAsync(async function (req, res, next) {
  const { username, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    user.save();
    // res.json({ user });
  }
  if (!user) {
    const newUser = await User.create({
      username,
      email,
    });
    // res.json({ user: newUser });
  }
  const contact = await activeCampaignApi.createContact(req.body);
  res.json({ contact });
  if (!contact)
    next(
      new AppError(
        'Algo pasó en el servidor, vuelve a intentarlo por favor',
        500
      )
    );
});

module.exports = {
  createUser,
  getUsers,
};
