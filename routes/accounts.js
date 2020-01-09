const express = require('express');

const {
  createAccount,
  getAccounts,
  getAccount
} = require('../controllers/accounts');

const router = express.Router();

router
  .route('/')
  .get(getAccounts)
  .post(createAccount);

router.route('/:id').get(getAccount);

module.exports = router;
