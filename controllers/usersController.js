const User = require('../models/user');
require('dotenv').config();

const catchAsync = require('./../utils/catchAsync');

// if (process.env.NODE_ENV !== 'production') {
//   JWT_SECRET = process.env.JWT_SECRET;
// }

//handlers

const createUser = catchAsync(async function (req, res, next) {
  const { username, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    user.engaged = true;
    user.new = true;
    user.active = true;
    user.save();
    res.json({ user });
  }
  if (!user) {
    const newUser = await User.create({
      username,
      email,
    });
    res.json({ user: newUser });
  }
});


module.exports = {
createUser
};
