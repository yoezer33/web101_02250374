const express = require('express');
const router = express.Router();
const {
  getAllVideos,
  getFollowingVideos
} = require('../controllers/videoController');

// GET /api/videos
router.get('/', getAllVideos);

// GET /api/videos/following
router.get('/following', getFollowingVideos);

module.exports = router;