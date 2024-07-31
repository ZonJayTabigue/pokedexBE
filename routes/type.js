const express = require('express');
const router = express.Router();
const getTypes = require('../controllers/typesControllers/getTypes');

router.get('/', getTypes);

module.exports = router;
