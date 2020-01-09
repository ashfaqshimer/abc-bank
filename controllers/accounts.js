const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Account = require('../models/Account');

// @desc    Create an account
// @route   POST /api/v1/accounts
// @access  Admin
exports.createAccount = asyncHandler(async (req, res, next) => {
  const account = await Account.create(req.body);

  res.status(201).json({
    success: true,
    data: account
  });
});

// @desc    Get all accounts
// @route   GET /api/v1/accounts
// @access  Admin
exports.getAccounts = asyncHandler(async (req, res, next) => {
  const account = 'Get accounts';

  res.status(201).json({
    success: true,
    data: account
  });
});

// @desc    Get a single account
// @route   GET /api/v1/accounts/:id
// @access  Admin
exports.getAccount = asyncHandler(async (req, res, next) => {
  const account = `Get account for id ${req.params.id}`;

  res.status(201).json({
    success: true,
    data: account
  });
});
