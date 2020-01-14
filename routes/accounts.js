const express = require('express');

const {
  createAccount,
  getAccounts,
  getAccount,
  editAccount,
  deleteAccount
} = require('../controllers/accounts');

const Account = require('../models/Account');
const advancedResults = require('../middleware/advancedResults');
const { authorize, protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('admin'), advancedResults(Account), getAccounts)
  .post(protect, authorize('admin'), createAccount);

router
  .route('/:id')
  .get(protect, getAccount)
  .put(protect, authorize('admin'), editAccount)
  .delete(protect, authorize('admin'), deleteAccount);

module.exports = router;
