const express = require('express');

const {
	createTransaction,
	getTransactions,
	getTransaction,
	editTransaction,
	deleteTransaction
} = require('../controllers/transactions');

const Transaction = require('../models/Transaction');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
	.route('/')
	// .get(
	// 	protect,
	// 	authorize('admin'),
	// 	advancedResults(Transaction),
	// 	getTransactions
	// )
	.get(advancedResults(Transaction), getTransactions)
	// .post(protect, createTransaction);
	.post(createTransaction);

router
	.route('/:id')
	.get(protect, getTransaction)
	.put(protect, authorize('admin'), editTransaction)
	.delete(protect, authorize('admin'), deleteTransaction);

module.exports = router;
