const express = require('express');
const router = express.Router();
const {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicleController');
const { protect, fleetOwner } = require('../middleware/authMiddleware');

router.route('/').get(getVehicles).post(protect, fleetOwner, createVehicle);
router
  .route('/:id')
  .get(getVehicleById)
  .put(protect, fleetOwner, updateVehicle)
  .delete(protect, fleetOwner, deleteVehicle);

module.exports = router;
