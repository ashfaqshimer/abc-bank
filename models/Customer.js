const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required']
    },
    address: {
      type: String
    },
    contactNumber: {
      type: String,
      match: [
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
        'Please add a valid contact number'
      ],
      required: true
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    nicNumber: {
      type: String,
      required: [true, 'NIC number is required'],
      unique: true
    },
    userCreated: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Need to reverse populate the accounts for the customer

module.exports = mongoose.model('Customer', CustomerSchema);
