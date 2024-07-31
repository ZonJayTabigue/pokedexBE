const express = require('express');
const router = express.Router();
const getAllStats = require('../controllers/statsControllers/getAllStats');

router.get('/', getAllStats);

module.exports = router;
