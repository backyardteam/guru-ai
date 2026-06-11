const { getDb } = require("../database");
const aiService = require("../aiService");

async function generateSoal(req, res) {
  try {
    const { mataPelajaran, topik, jumlah, level, jenis } = req.body;
    const soal = await aiService.generateSoal(
      mataPelajaran,
      topik,
      jumlah,
      level,
      jenis,
    );
    res.json(soal);
  } catch (error) {
    res.status(500).json({ error: "Gagal generate soal" });
  }
}

module.exports = { generateSoal };
