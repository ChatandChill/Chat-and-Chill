const express = require('express');
const app = express();
require('dotenv').config();

app.get('/api/photos', async (req, res) => {
  const query = req.query.q || 'chill';
  const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=15`, {
    headers: { Authorization: process.env.PEXELS_API_KEY }
  });
  const data = await response.json();
  res.json(data.photos);
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
