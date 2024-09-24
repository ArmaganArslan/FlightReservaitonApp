// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyFlightsPage from "./pages/MyFlightsPage";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./App.css";
import PlaneIcon from "./icons/plane.png"; // İkonu içe aktar
import DealsIcon from "./icons/deals.png"; // İkonu içe aktar
import DiscoverIcon from "./icons/discover.png"; // İkonu içe aktar
import ProfileIcon from "./icons/profile.png"; // İkonu içe aktar

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar className="header" style={{ color: "#292929" }}>
          <img
            src={PlaneIcon}
            alt="Plane"
            style={{ width: "24px", height: "24px", marginRight: "8px" }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PLANE SCAPE
          </Typography>

          <Button color="inherit" component={Link} to="/">
            <img
              src={DealsIcon}
              alt="Deals"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Deals
          </Button>
          <Button color="inherit" component={Link} to="/">
            <img
              src={DiscoverIcon}
              alt="Discover"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Discover
          </Button>
          <Button color="inherit" component={Link} to="/my-flights">
            <img
              src={ProfileIcon}
              alt="Profile"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
            Armağan Arslan
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-flights" element={<MyFlightsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
