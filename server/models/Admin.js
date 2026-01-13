const mongoose = require('mongoose');
const User = require('./User');

const adminSchema = new mongoose.Schema({
  accessLevel: {
    type: String,
    enum: ['super', 'moderator'],
    default: 'moderator',
  },
  permissions: {
    manageUsers: { type: Boolean, default: false },
    approveVehicles: { type: Boolean, default: false },
    processRefunds: { type: Boolean, default: false },
  },
});

const Admin = User.discriminator('admin', adminSchema);

module.exports = Admin;
