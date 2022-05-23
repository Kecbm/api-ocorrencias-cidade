const express = require('express');
const router = express.Router();

const error = require('./src/controllers/middlewares/error');

//Health Checker controller
router.use('/healthchecker', require('./src/controllers/healthchecker'));
router.use(error);

module.exports = router;