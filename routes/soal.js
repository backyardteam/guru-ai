const express = require("express");
const router = express.Router();
const soalController = require("../controllers/soalController");

router.post("/generate", soalController.generateSoal);
router.get("/", soalController.getBankSoal);
router.post("/", soalController.saveSoal);

module.exports = router;
