// server/routes/reservations.js

const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Tüm rezervasyonları getir
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ reservedAt: -1 });
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Rezervasyonlar alınırken bir hata oluştu.' });
  }
});

// Yeni rezervasyon oluştur
router.post('/', async (req, res) => {
  const { flightId, scheduleTime, flightNumber, flightDirection } = req.body;

  // Geçmiş tarih kontrolü
  const flightDate = new Date(scheduleTime);
  const currentDate = new Date();

  // Aynı uçuş için mevcut rezervasyon kontrolü
  const existingReservation = await Reservation.findOne({ flightId });
  if (existingReservation) {
    return res.status(400).json({ message: 'Bu uçuş için zaten bir rezervasyonunuz var.' });
  }

  if (flightDate < currentDate) {
    return res.status(400).json({ message: 'Geçmiş tarihli uçuşlar için rezervasyon yapamazsınız.' });
  }

  const newReservation = new Reservation({
    flightId,
    scheduleTime,
    flightNumber,
    direction: flightDirection // Burada güncelleme yapıldı
  });

  try {
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Rezervasyon oluşturulurken bir hata oluştu.' });
  }
});


module.exports = router;
