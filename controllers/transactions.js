const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Transaction = require('../models/Transaction');

// @desc    Create a transaction
// @route   POST /api/v1/transactions
// @access  Private/Admin
exports.createTransaction = asyncHandler(async (req, res, next) => {
	const transaction = await Transaction.create(req.body);

	res.status(201).json({
		success: true,
		data: transaction
	});
});

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Admin
exports.getTransactions = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc    Get a single transaction
// @route   GET /api/v1/transactions/:id
// @access  Private/Admin
exports.getTransaction = asyncHandler(async (req, res, next) => {
	const transaction = await Transaction.findById(req.params.id);

	if (!transaction) {
		return next(
			new ErrorResponse(`Transaction ${req.params.id} does not exist`)
		);
	}

	res.status(201).json({
		success: true,
		data: transaction
	});
});

// @desc    Edit a single transaction
// @route   PUT /api/v1/transactions/:id
// @access  Admin
exports.editTransaction = asyncHandler(async (req, res, next) => {
	let transaction = await Transaction.findById(req.params.id);

	if (!transaction) {
		return next(
			new ErrorResponse(
				`Transaction not found with id of ${req.params.id}`,
				404
			)
		);
	}

	transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	res.status(201).json({
		success: true,
		data: transaction
	});
});

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Admin
exports.deleteTransaction = asyncHandler(async (req, res, next) => {
	await Transaction.findByIdAndDelete(req.params.id);

	res.status(201).json({ success: true, data: {} });
});
