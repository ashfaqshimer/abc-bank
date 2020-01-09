// Core dependencies
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Security libraries

// Local imports
const connectDb = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDb();
