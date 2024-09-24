// src/pages/HomePage.js

import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Pagination,
  Box,
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  Radio,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import FlightList from "../components/FlightList";
import axios from "axios";
import { FlightTakeoff, FlightLand } from "@mui/icons-material";
import Image1 from "../icons/carRentals.jpg"; 
import Image2 from "../icons/hotels.jpg";
import Image3 from "../icons/travelPackages.png";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HotelIcon from '@mui/icons-material/Hotel';
import UmbrellaIcon from '@mui/icons-material/BeachAccess';

function HomePage() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [date, setDate] = useState("");
  const [direction, setDirection] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchFlights(page);
  }, [page]);

  const fetchFlights = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/flights?page=${page - 1}`
      );
      setFlights(response.data.flights);
      setFilteredFlights(response.data.flights);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const handleFilter = () => {
    let filtered = flights;
    if (date) {
      filtered = filtered.filter((flight) =>
        flight.scheduleDate.startsWith(date)
      );
    }
    if (direction) {
      filtered = filtered.filter(
        (flight) =>
          flight.flightDirection.toLowerCase() === direction.toLowerCase()
      );
    }
    setFilteredFlights(filtered);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: '#F6F4F8', minHeight: '100vh' }}>

  <Typography variant="h6" gutterBottom mt={2}>
    BOOK YOUR FLIGHT
  </Typography>

  {/* Filter Section */}
  <Grid container spacing={1} mb={2}> {/* spacing değerini 2'den 1'e düşürdük */}
    <Grid item xs={12} sm={4}>
      <ToggleButtonGroup
        value={direction}
        exclusive
        onChange={(e, newDirection) => setDirection(newDirection)}
        aria-label="Hareket Yönü"
        fullWidth
      >
        <ToggleButton
          value="A"
          aria-label="Gidiş"
          style={{
            justifyContent: "flex-start",
            padding: "6px 12px",
            fontSize: "0.875rem",
            borderRadius: "20px 0 0 20px",
          }}
        >
          <FlightTakeoff style={{ marginRight: "4px" }} />
        </ToggleButton>
        <ToggleButton
          value="D"
          aria-label="Dönüş"
          style={{
            justifyContent: "flex-start",
            padding: "6px 12px",
            fontSize: "0.875rem",
            borderRadius: "0 20px 20px 0",
          }}
        >
          <FlightLand style={{ marginRight: "4px" }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>

    <Grid item xs={12} sm={4} container spacing={1}>
      <Grid item xs={6}>
        <TextField
          label="Gidiş Tarihi"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: 0,
            fontSize: "0.875rem",
            height: "100%",
            borderRadius: "20px 0 0 20px",
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Dönüş Tarihi"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: 0,
            fontSize: "0.875rem",
            height: "100%",
            borderRadius: "0 20px 20px 0",
          }}
        />
      </Grid>
    </Grid>
  </Grid>

  {/* Show Flights Button */}
  <Grid container justifyContent="flex-start" mt={2}>
    <Button 
      variant="contained" 
      sx={{ 
        backgroundColor: '#4B0097', 
        color: 'white', 
        '&:hover': { backgroundColor: '#37007F' } 
      }}
      onClick={handleFilter}
    >
      Show Flights
    </Button>
  </Grid>

  {/* Flights, Filter Menu and Images Layout */}
  <Grid container spacing={3} mt={3}> {/* spacing değerini 4'ten 3'e düşürdük */}
    {/* Flights List */}
    <Grid item xs={12} md={8}>
      <FlightList flights={filteredFlights} />
    </Grid>

    {/* Filter Menu and Images */}
    <Grid item xs={12} md={4}>
      <Box
        border="1px solid #ddd"
        borderRadius="8px"
        padding="16px"
        bgcolor="#f9f9f9"
      >
        <Typography variant="h6">Sort by:</Typography>
        <FormControl fullWidth variant="outlined" margin="normal">
          <Select defaultValue="" displayEmpty>
            <MenuItem value="" disabled>Lowest price (select)</MenuItem>
            <MenuItem value={10}>$100</MenuItem>
            <MenuItem value={20}>$200</MenuItem>
            <MenuItem value={30}>$300</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6">Arrival Time</Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Time</FormLabel>
          <FormControlLabel control={<Radio />} label="5:00 AM" />
          <FormControlLabel control={<Radio />} label="11:59 AM" />
          <FormControlLabel control={<Radio />} label="12:00 PM" />
          <FormControlLabel control={<Radio />} label="5:59 PM" />
        </FormControl>

        <Typography variant="h6">Stops</Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Stops</FormLabel>
          <FormControlLabel control={<Radio />} label="Nonstop $230" />
          <FormControlLabel control={<Radio />} label="1 Stop $230" />
          <FormControlLabel control={<Radio />} label="2+ Stops $230" />
        </FormControl>

        <Typography variant="h6">Airlines Included</Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Airline</FormLabel>
          <FormControlLabel control={<Radio />} label="Alitalia $230" />
          <FormControlLabel control={<Radio />} label="Lufthansa $230" />
          <FormControlLabel control={<Radio />} label="Air France $230" />
          <FormControlLabel control={<Radio />} label="Brussels Airlines $230" />
          <FormControlLabel control={<Radio />} label="Air Italy $230" />
          <FormControlLabel control={<Radio />} label="Siberia $230" />
        </FormControl>
      </Box>

      {/* Sağdaki Görsel Kartlar */}
      <Box display="flex" flexDirection="column" alignItems="flex-end" mt={2}>
            {/* Image 1 */}
            <Box position="relative" mb={2}>
              <img
                src={Image1}
                alt="Car Rentals"
                style={{
                  width: '230px', 
                  height: '230px', 
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
              <Box
                position="absolute"
                bottom={10}
                left={10}
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <DirectionsCarIcon sx={{ fontSize: '24px', color: '#fff', mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#fff', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  CAR RENTALS
                </Typography>
              </Box>
            </Box>

            {/* Image 2 */}
            <Box position="relative" mb={2}>
              <img
                src={Image2}
                alt="Hotels"
                style={{
                  width: '230px', 
                  height: '230px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
              <Box
                position="absolute"
                bottom={10}
                left={10}
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <HotelIcon sx={{ fontSize: '24px', color: '#fff', mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#fff', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  HOTELS
                </Typography>
              </Box>
            </Box>

            {/* Image 3 */}
            <Box position="relative">
              <img
                src={Image3}
                alt="Travel Packages"
                style={{
                  width: '230px', 
                  height: '230px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
              <Box
                position="absolute"
                bottom={10}
                left={10}
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <UmbrellaIcon sx={{ fontSize: '24px', color: '#fff', mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#fff', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  TRAVEL PACKAGES
                </Typography>
              </Box>
            </Box>
            
          </Box>
          
    </Grid>
  </Grid>

  <Grid container justifyContent="center" mt={2}>
    <Pagination
      count={totalPages}
      page={page}
      onChange={handlePageChange}
      color="primary"
    />
  </Grid>
</Container>

  );
}

export default HomePage;
