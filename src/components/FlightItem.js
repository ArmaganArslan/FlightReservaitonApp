// src/components/FlightItem.js

import React from 'react';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import { FlightTakeoff, FlightLand, Schedule, AttachMoney } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FlightItem({ flight }) {
  const navigate = useNavigate();

  const handleReserve = async () => {
    try {
      const reservation = {
        flightId: flight.id,
        scheduleTime: flight.scheduleTime,
        scheduleDate: flight.scheduleDate,
        flightNumber: flight.flightNumber,
        flightDirection: flight.flightDirection,
        flightName: flight.flightName
        // Diğer rezervasyon bilgilerini ekleyebilirsiniz
      };
      await axios.post('http://localhost:5000/api/reservations', reservation);
      alert('Uçuşunuz kaydedildi.');
      navigate('/my-flights');
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('Rezervasyon sırasında bir hata oluştu.');
    }
  };

  return (
    <Card sx={{
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      padding: '16px',
      margin: '16px 0',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          {flight.flightName}
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} display="flex" alignItems="center">
            <FlightTakeoff sx={{ marginRight: '8px', color: '#4B0097' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '1rem' } }}>Kalkış</Typography>
              <Typography sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>{flight.scheduleTime}</Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>Havaalanı: {flight.flightNumber}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} display="flex" alignItems="center">
            <FlightLand sx={{ marginRight: '8px', color: '#4B0097' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '1rem' } }}>Varış</Typography>
              <Typography sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>{flight.scheduleDate}</Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>Havaalanı: {flight.flightDirection}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      
      <Box display="flex" alignItems="center" flexDirection="column" ml={2}>
        <Box display="flex" alignItems="center" mb={1}>
          <AttachMoney sx={{ color: '#4B0097' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>Fiyat</Typography>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4B0097', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>${flight.price}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleReserve}
          sx={{
            backgroundColor: '#4B0097',
            color: '#fff',
            marginTop: '8px',
            padding: { xs: '6px 12px', sm: '8px 16px' },
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            '&:hover': {
              backgroundColor: '#37007F'
            }
          }}
        >
          Rezervasyon Yap
        </Button>
      </Box>
    </Card>
  );
}

export default FlightItem;
