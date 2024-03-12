const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error when user tries to update password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for updating password, please use /updateMyPassword',
        400,
      ),
    );
  }

  // 2. Filtered out unwanted fields
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 2. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'sucess',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

exports.getUser = (req, res) => {
  res.status(502).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.createUser = (req, res) => {
  res.status(502).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.updateUser = (req, res) => {
  res.status(502).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(502).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
