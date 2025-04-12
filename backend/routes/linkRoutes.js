const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createLink,getAllLinks,deleteLink } = require('../controllers/linkController');

router.post('/create', auth, createLink);
router.get('/user',auth,getAllLinks)
router.delete('/:id', auth, deleteLink);

module.exports = router;
