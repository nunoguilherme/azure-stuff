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

app.get('/launches', async (req, res) => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v4/launches/latest');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error occurred while fetching data.');
  }
});

app.listen(port, () => {
  console.log(`App listening at port number: ${port}`);
});
