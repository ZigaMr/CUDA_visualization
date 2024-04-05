// backend/src/routes/algorithmRoutes.js

const express = require('express');
const router = express.Router();

// Import controller functions
const { createAlgorithm, runAlgorithm } = require('../controllers/algorithmController');

// Define routes
router.post('/', createAlgorithm);
router.post('/run', runAlgorithm);

module.exports = router;
