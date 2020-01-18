const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ['debit', 'credit'],
			required: [true, 'Transaction type must be specified']
		},
		amount: {
			type: Number,
			required: [true, 'Transaction amount must be specified']
		},
		source: {
			type: String,
			enum: ['ATM', 'POS', 'mobile', 'computer'],
			required: [true, 'Source should be specified']
		},
		account: {
			type: mongoose.Schema.ObjectId,
			ref: 'Account',
			required: [true, 'Customer account id is required']
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
