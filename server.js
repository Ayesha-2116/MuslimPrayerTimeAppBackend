// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

// API route to fetch prayer times for a given location
app.get("/api/prayer-times", async (req, res) => {
  const location = req.query.location;
  const API_KEY = process.env.API_KEY; // This comes from the .env file

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    // Call the MuslimSalat API using axios
    const response = await axios.get(
      `https://muslimsalat.com/${location}/daily.json?key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching prayer times:", error.message);
    res.status(500).json({ error: "Failed to fetch prayer times" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
