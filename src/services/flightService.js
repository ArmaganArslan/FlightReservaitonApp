// src/services/flightService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getFlights = () => {
  return axios.get(`${API_URL}/flights`);
};
