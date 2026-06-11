const express = require("express");
const router = express.Router();
const analisisController = require("../controllers/analisisController");

// Rute untuk mendapatkan hasil analisis berdasarkan asesmen atau siswa
router.get("/asesmen/:asesmen_id", analisisController.getAnalisisAsesmen);
router.get("/siswa/:siswa_id", analisisController.getAnalisisSiswa);
router.post("/generate-laporan", analisisController.generateLaporanAnalisis);

module.exports = router;
