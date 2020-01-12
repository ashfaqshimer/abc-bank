const express = require('express');

const {
	createCustomer,
	getCustomers,
	getCustomer,
	editCustomer,
	deleteCustomer
} = require('../controllers/customers');

const router = express.Router();

router
	.route('/')
	.get(getCustomers)
	.post(createCustomer);

router
	.route('/:id')
	.get(getCustomer)
	.put(editCustomer)
	.delete(deleteCustomer);

module.exports = router;
