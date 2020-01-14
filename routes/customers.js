const express = require('express');

const {
  createCustomer,
  getCustomers,
  getCustomer,
  editCustomer,
  deleteCustomer
} = require('../controllers/customers');

const Customer = require('../models/Customer');
const advancedResults = require('../middleware/advancedResults');

// Include other routers
const accountsRouter = require('./accounts');

const router = express.Router();

// Reroute to other routes
router.use('/:customerId/accounts', accountsRouter);

router
  .route('/')
  .get(advancedResults(Customer), getCustomers)
  .post(createCustomer);

router
  .route('/:id')
  .get(getCustomer)
  .put(editCustomer)
  .delete(deleteCustomer);

module.exports = router;
