const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to MiniCloud SpaceX Launches API!');
});

app.get('/launches', async (req, res) => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v4/launches/latest');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error occurred while fetching data.');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
