const AppError = require('../utils/appError');

const User = require('../models/user');
const activeCampaignApi = require('../utils/activeCampaign');
require('dotenv').config();

const catchAsync = require('./../utils/catchAsync');

// const getUsers = catchAsync(async function (req, res, next) {
//   const users = await User.find({});
//   res.json({
//     length: users.length,
//     users: users,
//   });
// });

const createUser = catchAsync(async function (req, res, next) {
  const { firstName, email } = req.body;
  const user = await User.find({ email: email });
  if (user[0]) {
    const updatedList = await activeCampaignApi.postContactToAList(
      user[0].id,
      next
    );
    res.json(updatedList);
  }
  if (!user[0]) {
    const contact = await activeCampaignApi.createContact(req.body, next);
    const { cdate, udate, links, hash, id } = contact.contact;

    const newUser = await User.create({
      email,
      firstName,
      cdate,
      udate,
      links,
      hash,
      id,
    });
    const updatedList = await activeCampaignApi.postContactToAList(id, next);
    res.json(updatedList);
  }
});

// const deleteUsers = catchAsync(async function (req, res, next) {
//   const deletedUsers = await User.deleteMany({});
//   res.json({ deletedUsers });
// });

module.exports = {
  createUser,
  // getUsers,
  // deleteUsers,
};
