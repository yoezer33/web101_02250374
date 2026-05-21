const express = require('express');
const cors = require('cors');
require('dotenv').config();

const videoRoutes = require('./src/routes/videoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/videos', videoRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'TikTok Server running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});