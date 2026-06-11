const express = require('express');
const router = express.Router();
const soalController = require('../controllers/soalController');

router.post('/generate', soalController.generateSoal);
router.get('/', soalController.getBankSoal);
router.post('/', soalController.saveSoal);
router.put('/:id', soalController.updateSoal);
router.delete('/:id', soalController.deleteSoal);

module.exports = router;