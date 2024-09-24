// src/components/FlightList.js

import React from 'react';
import { Grid, Container } from '@mui/material';
import FlightItem from './FlightItem';

function FlightList({ flights }) {
  return (
    <Container sx={{ padding: '16px 0' }}>
      <Grid container spacing={4}>
        {flights.map(flight => (
          <Grid item xs={12} key={flight.id}>
            <FlightItem flight={flight} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FlightList;
