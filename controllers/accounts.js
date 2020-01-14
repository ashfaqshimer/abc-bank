const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Account = require('../models/Account');
const Customer = require('../models/Customer');

// @desc    Create an account
// @route   POST /api/v1/accounts
// @access  Admin
exports.createAccount = asyncHandler(async (req, res, next) => {
  // Check if the customer already exists
  const customer = await Customer.findById(req.body.customer);

  if (!customer) {
    return next(
      new ErrorResponse(`Customer ${req.body.customer} does not exist`)
    );
  }

  const account = await Account.create(req.body);

  res.status(201).json({
    success: true,
    data: account
  });
});

// @desc    Get all accounts
// @route   GET /api/v1/accounts
// @route   GET /api/v1/customers/:customerId/accounts
// @access  Admin
exports.getAccounts = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const accounts = await Account.find({ customer: req.params.customerId });

    return res.status(200).json({
      success: true,
      count: accounts.length,
      data: accounts
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get a single account
// @route   GET /api/v1/accounts/:id
// @access  Private/Admin
exports.getAccount = asyncHandler(async (req, res, next) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    return next(new ErrorResponse(`Account ${req.params.id} not found`));
  }

  // Make sure the user is the bootcamp owner
  if (
    account.customer.toString() !== req.user.customer &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to get account ${req.params.id}`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: account
  });
});

// @desc    Edit a single account
// @route   PUT /api/v1/accounts/:id
// @access  Admin
exports.editAccount = asyncHandler(async (req, res, next) => {
  let account = await Account.findById(req.params.id);

  if (!account) {
    return next(
      new ErrorResponse(`Account not found with id of ${req.params.id}`, 404)
    );
  }

  account = await Account.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    success: true,
    data: account
  });
});

// @desc    Delete an account
// @route   DELETE /api/v1/accounts/:id
// @access  Admin
exports.deleteAccount = asyncHandler(async (req, res, next) => {
  await Account.findByIdAndDelete(req.params.id);

  res.status(201).json({ success: true, data: {} });
});
