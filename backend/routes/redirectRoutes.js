const express = require('express');
const router = express.Router();
const { handleRedirect } = require('../controllers/redirectController');

router.get('/:code', handleRedirect);

module.exports = router;
