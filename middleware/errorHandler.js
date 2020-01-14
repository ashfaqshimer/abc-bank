const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  let errors;

  error.message = err.message;

  // Log to console for dev
  console.error(err.stack.red);
  // console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found for id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    errors = error.keyValue;
    error = new ErrorResponse(message, 409);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(value => value.message);
    error = new ErrorResponse(message, 400);
  }

  const response = { success: false, error: error.message || 'Server Error' };

  if (errors) {
    response.errors = errors;
  }

  res.status(error.statusCode || 500).json(response);
};

module.exports = errorHandler;
