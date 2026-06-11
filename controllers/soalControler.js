const { getDb } = require("../database");
// Sesuaikan path jika aiService berada di root atau folder lain
const aiService = require("../aiService");

async function generateSoal(req, res) {
  const { mataPelajaran, topik, jumlah, level, jenis } = req.body;
  try {
    if (!mataPelajaran || !topik) {
      return res
        .status(400)
        .json({ error: "Mata pelajaran dan topik wajib diisi" });
    }
    const soal = await aiService.generateSoal(
      mataPelajaran,
      topik,
      jumlah,
      level,
      jenis,
    );
    res.json(soal);
  } catch (err) {
    console.error("Error generateSoal:", err);
    res.status(500).json({ error: "Gagal generate soal dari AI" });
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
    console.error("Error getBankSoal:", err);
    res.status(500).json({ error: "Gagal mengambil data bank soal" });
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
      `INSERT INTO bank_soal (mata_pelajaran, topik, jenis, level, pertanyaan, opsi, kunci_jawaban, kompetensi) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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
    res.status(201).json({ success: true, message: "Soal berhasil disimpan" });
  } catch (err) {
    console.error("Error saveSoal:", err);
    res.status(500).json({ error: "Gagal menyimpan soal" });
  }
}

async function updateSoal(req, res) {
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
      `UPDATE bank_soal SET mata_pelajaran=?, topik=?, jenis=?, level=?, pertanyaan=?, opsi=?, kunci_jawaban=?, kompetensi=?
             WHERE id=?`,
      [
        mata_pelajaran,
        topik,
        jenis,
        level,
        pertanyaan,
        JSON.stringify(opsi),
        kunci_jawaban,
        kompetensi,
        req.params.id,
      ],
    );
    res.json({ success: true, message: "Soal berhasil diperbarui" });
  } catch (err) {
    console.error("Error updateSoal:", err);
    res.status(500).json({ error: "Gagal memperbarui soal" });
  }
}

async function deleteSoal(req, res) {
  try {
    const db = getDb();
    await db.run("DELETE FROM bank_soal WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Soal berhasil dihapus" });
  } catch (err) {
    console.error("Error deleteSoal:", err);
    res.status(500).json({ error: "Gagal menghapus soal" });
  }
}

module.exports = {
  generateSoal,
  getBankSoal,
  saveSoal,
  updateSoal,
  deleteSoal,
};
