const express = require('express');
const router = express.Router();
const getAllAbilities = require('../controllers/abilitiesControllers/getAllAbilities');

router.get('/', getAllAbilities);

module.exports = router;
