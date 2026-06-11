const { getDb } = require("../database");

async function getAnalisisAsesmen(req, res) {
  try {
    const db = getDb();
    const data = await db.all(
      "SELECT * FROM hasil_asesmen WHERE asesmen_id = ?",
      [req.params.asesmen_id],
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAnalisisSiswa(req, res) {
  try {
    const db = getDb();
    const data = await db.all(
      "SELECT * FROM hasil_asesmen WHERE siswa_id = ?",
      [req.params.siswa_id],
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function generateLaporanAnalisis(req, res) {
  try {
    // Logika untuk generate laporan (bisa disesuaikan nanti)
    res.json({ message: "Laporan berhasil di-generate" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAnalisisAsesmen,
  getAnalisisSiswa,
  generateLaporanAnalisis,
};
