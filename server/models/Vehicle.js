const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing User, but logic should ensure it's a FleetOwner
    required: true,
  },
  type: {
    type: String,
    enum: ['bus', 'car', 'van'],
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  seatingCapacity: {
    type: Number,
    required: true,
  },
  amenities: [{
    type: String,
  }],
  photos: [{
    type: String, // URLs
  }],
  availability: {
    startDate: Date,
    endDate: Date,
  },
  pricePerKm: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'maintenance'],
    default: 'available',
  },
}, {
  timestamps: true,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
