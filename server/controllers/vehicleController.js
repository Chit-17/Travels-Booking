const Vehicle = require('../models/Vehicle');

// @desc    Fetch all vehicles
// @route   GET /api/vehicles
// @access  Public
const getVehicles = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Vehicle.countDocuments({ ...keyword });
  const vehicles = await Vehicle.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ vehicles, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Fetch single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicleById = async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id).populate('owner', 'name email companyName');

  if (vehicle) {
    res.json(vehicle);
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
};

// @desc    Create a vehicle
// @route   POST /api/vehicles
// @access  Private/FleetOwner/Admin
const createVehicle = async (req, res) => {
  const {
    type,
    make,
    model,
    year,
    seatingCapacity,
    amenities,
    photos,
    pricePerKm,
    availability,
  } = req.body;

  const vehicle = new Vehicle({
    owner: req.user._id,
    type,
    make,
    model,
    year,
    seatingCapacity,
    amenities,
    photos,
    pricePerKm,
    availability,
  });

  const createdVehicle = await vehicle.save();
  res.status(201).json(createdVehicle);
};

// @desc    Update a vehicle
// @route   PUT /api/vehicles/:id
// @access  Private/FleetOwner/Admin
const updateVehicle = async (req, res) => {
  const {
    type,
    make,
    model,
    year,
    seatingCapacity,
    amenities,
    photos,
    pricePerKm,
    status,
    availability
  } = req.body;

  const vehicle = await Vehicle.findById(req.params.id);

  if (vehicle) {
      // Check if the user is the owner or an admin
    if (vehicle.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(401).json({ message: 'Not authorized to update this vehicle' });
        return;
    }

    vehicle.type = type || vehicle.type;
    vehicle.make = make || vehicle.make;
    vehicle.model = model || vehicle.model;
    vehicle.year = year || vehicle.year;
    vehicle.seatingCapacity = seatingCapacity || vehicle.seatingCapacity;
    vehicle.amenities = amenities || vehicle.amenities;
    vehicle.photos = photos || vehicle.photos;
    vehicle.pricePerKm = pricePerKm || vehicle.pricePerKm;
    vehicle.status = status || vehicle.status;
    vehicle.availability = availability || vehicle.availability;

    const updatedVehicle = await vehicle.save();
    res.json(updatedVehicle);
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private/FleetOwner/Admin
const deleteVehicle = async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (vehicle) {
    if (vehicle.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(401).json({ message: 'Not authorized to delete this vehicle' });
        return;
    }
    
    await vehicle.deleteOne();
    res.json({ message: 'Vehicle removed' });
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
};

module.exports = {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
