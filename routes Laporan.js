const express = require("express");
const router = express.Router();
const laporanController = require("./controllers/laporanController");

router.get("/siswa/:id/pdf", laporanController.generatePDFSiswa);
router.get("/kelas/pdf", laporanController.generatePDFKelas);
router.get("/siswa/excel", laporanController.exportExcelSiswa);

module.exports = router;
