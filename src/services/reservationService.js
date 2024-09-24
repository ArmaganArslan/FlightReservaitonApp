// src/services/reservationService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createReservation = (reservation) => {
  return axios.post(`${API_URL}/reservations`, reservation);
};

export const getReservations = () => {
  return axios.get(`${API_URL}/reservations`);
};
