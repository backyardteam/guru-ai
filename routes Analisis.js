const express = require("express");
const router = express.Router();
const analisisController = require("./controllers/analisisController");

router.post("/kompetensi", analisisController.analisisKompetensi);
router.post("/learning-gap", analisisController.learningGap);
router.post("/treatment", analisisController.treatment);
router.get("/kelas", analisisController.analisisKelas);

module.exports = router;
