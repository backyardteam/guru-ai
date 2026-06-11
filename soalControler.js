const { getDb } = require('../database');
const aiService = require('../services/aiService');

async function generateSoal(req, res) {
    const { mataPelajaran, topik, jumlah, level, jenis } = req.body;
    try {
        const soal = await aiService.generateSoal(mataPelajaran, topik, jumlah, level, jenis);
        res.json(soal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getBankSoal(req, res) {
    const db = getDb();
    const { mata_pelajaran, topik, level } = req.query;
    let query = 'SELECT * FROM bank_soal WHERE 1=1';
    const params = [];
    if (mata_pelajaran) { query += ' AND mata_pelajaran = ?'; params.push(mata_pelajaran); }
    if (topik) { query += ' AND topik LIKE ?'; params.push(`%${topik}%`); }
    if (level) { query += ' AND level = ?'; params.push(level); }
    const soal = await db.all(query, params);
    res.json(soal);
}

async function saveSoal(req, res) {
    const { mata_pelajaran, topik, jenis, level, pertanyaan, opsi, kunci_jawaban, kompetensi } = req.body;
    const db = getDb();
    await db.run(
        `INSERT INTO bank_soal (mata_pelajaran, topik, jenis, level, pertanyaan, opsi, kunci_jawaban, kompetensi) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        mata_pelajaran, topik, jenis, level, pertanyaan, JSON.stringify(opsi), kunci_jawaban, kompetensi
    );
    res.status(201).json({ success: true });
}

async function updateSoal(req, res) {
    const { mata_pelajaran, topik, jenis, level, pertanyaan, opsi, kunci_jawaban, kompetensi } = req.body;
    const db = getDb();
    await db.run(
        `UPDATE bank_soal SET mata_pelajaran=?, topik=?, jenis=?, level=?, pertanyaan=?, opsi=?, kunci_jawaban=?, kompetensi=?
         WHERE id=?`,
        mata_pelajaran, topik, jenis, level, pertanyaan, JSON.stringify(opsi), kunci_jawaban, kompetensi, req.params.id
    );
    res.json({ success: true });
}

async function deleteSoal(req, res) {
    const db = getDb();
    await db.run('DELETE FROM bank_soal WHERE id = ?', req.params.id);
    res.json({ success: true });
}

module.exports = { generateSoal, getBankSoal, saveSoal, updateSoal, deleteSoal };