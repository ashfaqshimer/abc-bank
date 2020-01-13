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

// @desc    Get all customers
// @route   GET /api/v1/customers
// @access  Admin
exports.getCustomers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get a single customer
// @route   GET /api/v1/customers/:id
// @access  Private/Admin
exports.getCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  res.status(201).json({
    success: true,
    data: customer
  });
});

// @desc    Edit a single customer
// @route   PUT /api/v1/customers/:id
// @access  Private/Admin
exports.editCustomer = asyncHandler(async (req, res, next) => {
  let customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(
      new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure the customer or an Admin is logged in

  customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    success: true,
    data: customer
  });
});

// @desc    Delete a customer
// @route   DELETE /api/v1/customers/:id
// @access  Admin
exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  await Customer.findByIdAndDelete(req.params.id);

  res.status(201).json({ success: true, data: {} });
});
