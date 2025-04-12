const express = require('express');
const router = express.Router();
const { getLinkAnalytics } = require('../controllers/analyticsController');
const auth = require('../middlewares/authMiddleware');

router.get('/:linkId', auth, getLinkAnalytics);

module.exports = router;
