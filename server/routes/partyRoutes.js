const express = require('express');
const {loginParty} = require('../controllers/partyController');
const router = express.Router();

router.post('/login', loginParty);

module.exports = router;