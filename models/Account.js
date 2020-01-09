const mongoose = require('mongoose');
const uuid = require('uuid/v1');

const AccountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'User id is required']
    },
    accountNumber: {
      // This will have to be generated using an algorithm not specified to the user
      type: String,
      unique: true
    },
    accountType: {
      type: String,
      enum: ['Savings', 'Current'],
      required: [true, 'Account type needs to be specified']
    },
    accountBalance: {
      type: Number,
      default: 0
    },
    runningTotals: {
      type: Number,
      default: 0
    },
    overDraft: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Generate an account number before saving the record
AccountSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.accountNumber = uuid();
  }
});

// Reverse populate with virtuals
AccountSchema.virtual('transactions', {
  ref: 'Transaction',
  localField: '_id',
  foreignField: 'account',
  justOne: false
});

module.exports = mongoose.model('Account', AccountSchema);
