const express = require('express');
const router = express.Router();
const koreksiController = require('../controllers/koreksiController');

router.post('/', koreksiController.koreksiJawaban);
router.post('/simpan', koreksiController.simpanHasil);

module.exports = router;