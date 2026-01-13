const mongoose = require('mongoose');
const User = require('./User');

const fleetOwnerSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  bankDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String,
  },
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  documents: [{ // Plan mentioned documents for owners
    type: String // URL to document
  }]
});

const FleetOwner = User.discriminator('fleet_owner', fleetOwnerSchema);

module.exports = FleetOwner;
