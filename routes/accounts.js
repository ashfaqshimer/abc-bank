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

const router = express.Router();

router
  .route('/')
  .get(advancedResults(Account), getAccounts)
  .post(createAccount);

router
  .route('/:id')
  .get(getAccount)
  .put(editAccount)
  .delete(deleteAccount);

module.exports = router;
