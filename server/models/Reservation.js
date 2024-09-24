// server/models/Reservation.js

const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  flightId: { type: String, required: true },
  scheduleTime: { type: String, required: true },
  flightNumber: { type: String, required: true },
  direction: { type: String, required: true },
  reservedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
