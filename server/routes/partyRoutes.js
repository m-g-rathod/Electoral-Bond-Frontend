const express = require('express');
const {loginParty, getPartyAdv, addPartyAdv, getPartyChannel} = require('../controllers/partyController');
const router = express.Router();

router.post('/login', loginParty);
router.get('/adv/:id', getPartyAdv);
router.post('/add_adv', addPartyAdv);
router.get('/getChannel/:partyId', getPartyChannel);

module.exports = router;