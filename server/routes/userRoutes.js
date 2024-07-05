const express = require('express');
const router = express.Router();
const {getParties} = require('../controllers/userController')

router.get('/get_parties', getParties);

module.exports = router;