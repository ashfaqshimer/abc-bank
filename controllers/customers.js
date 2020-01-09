const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Customer = require('../models/Customer');

// @desc    Create a customer
// @route   POST /api/v1/customers
// @access  Admin
exports.createCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.create(req.body);

  res.status(201).json({
    success: true,
    data: customer
  });
});

// @desc    Get all accounts
// @route   GET /api/v1/accounts
// @access  Admin
exports.getCustomers = asyncHandler(async (req, res, next) => {
  const account = 'Get accounts';

  res.status(201).json({
    success: true,
    data: account
  });
});

// @desc    Get a single account
// @route   GET /api/v1/accounts/:id
// @access  Admin
exports.getCustomer = asyncHandler(async (req, res, next) => {
  const account = `Get account for id ${req.params.id}`;

  res.status(201).json({
    success: true,
    data: account
  });
});
