const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// @desc    Create a transaction
// @route   POST /api/v1/transactions
// @access  Private/Admin
exports.createTransaction = asyncHandler(async (req, res, next) => {
	const account = await Account.findById(req.body.account);
	console.log(account);

	if (!account) {
		return next(
			new ErrorResponse(`No account with id ${req.body.account}`, 404)
		);
	}
	const transaction = await Transaction.create(req.body);

	res.status(201).json({
		success: true,
		data: transaction
	});
});

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @route   GET /api/v1/accounts/:accountId/transactions
// @access  Admin
exports.getTransactions = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc    Get all transactions for an account
// @route   GET /api/v1/accounts/:accountId/transactions
// @access  Private/Admin
exports.getTransactionsForAccount = asyncHandler(async (req, res, next) => {
	// Make sure account belongs to user or user is admin
	const account = Account.findById(req.params.accountId);
	if (!account) {
		return next(
			new ErrorResponse(`No account with id ${req.params.accountId}`, 404)
		);
	}

	if (
		account.customer.toString() !== req.user.id &&
		req.user.role !== 'admin'
	) {
		return next(
			new ErrorResponse(`Not authorized to access transaction`, 401)
		);
	}

	const reqQuery = { ...req.query };

	// Set the fields that needs to be excluded
	const removeFields = ['select', 'sort', 'page', 'limit'];
	removeFields.forEach((param) => delete reqQuery[param]);

	// Process any query strings
	let queryStr = JSON.stringify(reqQuery);
	queryStr = queryStr.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`
	);
	queryStr = JSON.parse(queryStr);

	queryStr = { ...queryStr, account: req.params.accountId };

	let query = Transaction.find(queryStr);

	// Select Fields
	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	// Sort
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('-createdAt');
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 25;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await Transaction.countDocuments();

	query = query.skip(startIndex).limit(limit);

	// Execute query
	const results = await query;

	// Pagination result
	const pagination = {};

	if (endIndex < total) {
		pagination.next = { page: page + 1, limit };
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit
		};
	}

	res.status(200).json({
		success: true,
		count: results.length,
		total,
		pagination,
		data: results
	});
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
