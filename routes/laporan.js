const express = require("express");
const router = express.Router();
const laporanController = require("../controllers/laporanController");

router.get("/pdf/kelas", laporanController.generatePDFKelas);
router.get("/excel/siswa", laporanController.exportExcelSiswa);
router.get("/pdf/siswa/:id", laporanController.generatePDFSiswa);

module.exports = router;
