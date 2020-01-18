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

// Static method to update account balance of customer
TransactionSchema.statics.getAccountBalance = async function(accountId) {
	console.log(`getting account balance for ${accountId}`);
	const obj = await this.aggregate([
		{
			$match: { account: accountId }
		},
		{
			$group: {
				_id: '$account',
				accountBalance: { $sum: '$amount' }
			}
		}
	]);

	try {
		await this.model('Account').findByIdAndUpdate(accountId, {
			accountBalance: Math.ceil(obj[0].accountBalance / 10) * 10
		});
	} catch (err) {
		console.error(err);
	}
};

// Call getAccountBalance after save
TransactionSchema.post('save', function() {
	if (this.type === 'debit') {
		this.amount = this.amount * -1;
	}

	this.constructor.getAccountBalance(this.account);
});

// Call getAccountBalance before remove
TransactionSchema.pre('remove', function() {
	this.constructor.getAccountBalance(this.account);
});

module.exports = mongoose.model('Transaction', TransactionSchema);
