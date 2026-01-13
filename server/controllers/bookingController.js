const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const {
    vehicle,
    tripDetails,
    passengers,
    totalPrice,
    paymentMethod,
  } = req.body;

  if (!vehicle) {
    res.status(400).json({ message: 'No vehicle items' });
    return;
  } else {
    const booking = new Booking({
      user: req.user._id,
      vehicle,
      tripDetails,
      passengers,
      totalPrice,
      paymentStatus: 'pending', // Will update after payment gateway integration
    });

    const createdBooking = await booking.save();

    res.status(201).json(createdBooking);
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate(
    'user',
    'name email'
  ).populate('vehicle');

  if (booking) {
    // Allow user who made booking or admin or fleet owner of the vehicle to see it
    // Logic for fleet owner check might need vehicle owner population
    res.json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

// @desc    Update booking to paid
// @route   PUT /api/bookings/:id/pay
// @access  Private
const updateBookingToPaid = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.paymentStatus = 'paid';
    // booking.paymentResult = { ... } // Store payment gateway response

    const updatedBooking = await booking.save();

    res.json(updatedBooking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id });
  res.json(bookings);
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
  const bookings = await Booking.find({}).populate('user', 'id name');
  res.json(bookings);
};

module.exports = {
  createBooking,
  getBookingById,
  updateBookingToPaid,
  getMyBookings,
  getBookings,
};
