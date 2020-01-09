const express = require('express');

const {
  createCustomer,
  getCustomers,
  getCustomer
} = require('../controllers/customers');

const router = express.Router();

router
  .route('/')
  .get(getCustomers)
  .post(createCustomer);

router.route('/:id').get(getCustomer);

module.exports = router;
