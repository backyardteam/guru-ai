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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getBankSoal(req, res) {
  try {
    const db = getDb();
    const { mata_pelajaran, topik, level } = req.query;
    let query = "SELECT * FROM bank_soal WHERE 1=1";
    const params = [];
    if (mata_pelajaran) {
      query += " AND mata_pelajaran = ?";
      params.push(mata_pelajaran);
    }
    if (topik) {
      query += " AND topik LIKE ?";
      params.push(`%${topik}%`);
    }
    if (level) {
      query += " AND level = ?";
      params.push(level);
    }
    const soal = await db.all(query, params);
    res.json(soal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function saveSoal(req, res) {
  try {
    const {
      mata_pelajaran,
      topik,
      jenis,
      level,
      pertanyaan,
      opsi,
      kunci_jawaban,
      kompetensi,
    } = req.body;
    const db = getDb();
    await db.run(
      `INSERT INTO bank_soal (mata_pelajaran, topik, jenis, level, pertanyaan, opsi, kunci_jawaban, kompetensi) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        mata_pelajaran,
        topik,
        jenis,
        level,
        pertanyaan,
        JSON.stringify(opsi),
        kunci_jawaban,
        kompetensi,
      ],
    );
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { generateSoal, getBankSoal, saveSoal };
