// src/pages/MyFlightsPage.js

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

function MyFlightsPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={2}>Uçuşlarım</Typography>
      <Grid container spacing={2}>
        {reservations.map(reservation => (
          <Grid item xs={12} key={reservation._id}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">Uçuş No: {reservation.flightNumber}</Typography>
                <Typography>Hareket Yönü: {reservation.direction}</Typography>
                <Typography>Uçuş Saati: {reservation.scheduleTime}</Typography>
                {/* Diğer rezervasyon bilgilerini ekleyebilirsiniz */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MyFlightsPage;
