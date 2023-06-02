const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set the path for static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/launches', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/launch.html'));
});

app.get('/launch-data', async (req, res, next) => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v4/launches/latest');
    // Extract the necessary data
    const data = {
      name: response.data.name,
      date: response.data.date_utc,
      details: response.data.details,
      rocket: response.data.rocket,
      launchpad: response.data.launchpad,
      links: response.data.links,
    };
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/past-launches', async (req, res, next) => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v4/launches/past');
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`App listening at port number: ${port}`);
});

