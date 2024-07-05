const express = require('express');
const {loginParty, getPartyAdv, addPartyAdv} = require('../controllers/partyController');
const router = express.Router();

router.post('/login', loginParty);
router.get('/adv/:id', getPartyAdv);
router.post('/add_adv', addPartyAdv);

module.exports = router;