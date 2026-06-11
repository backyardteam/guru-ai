const { getDb } = require('../database');
const aiService = require('../services/aiService');

async function koreksiJawaban(req, res) {
    const { soal, jawabanSiswa } = req.body;
    let benar = 0;
    const hasil = soal.map((s, idx) => {
        const isBenar = (s.kunci_jawaban === jawabanSiswa[idx]);
        if (isBenar) benar++;
        return { soal: s.pertanyaan, jawabanSiswa: jawabanSiswa[idx], kunci: s.kunci_jawaban, benar: isBenar };
    });
    const nilai = Math.round((benar / soal.length) * 100);
    res.json({ benar, total: soal.length, nilai, persentase: nilai, hasilDetail: hasil });
}

async function simpanHasil(req, res) {
    const { asesmen_id, siswa_id, jawaban_json, nilai, analisis_json } = req.body;
    const db = getDb();
    await db.run(
        'INSERT INTO hasil_asesmen (asesmen_id, siswa_id, jawaban_json, nilai, analisis_json) VALUES (?, ?, ?, ?, ?)',
        asesmen_id, siswa_id, JSON.stringify(jawaban_json), nilai, JSON.stringify(analisis_json)
    );
    // Update kelompok
    let kelompok = 'E';
    if (nilai <= 39) kelompok = 'A';
    else if (nilai <= 59) kelompok = 'B';
    else if (nilai <= 79) kelompok = 'C';
    else if (nilai <= 89) kelompok = 'D';
    await db.run(`INSERT OR REPLACE INTO kelompok_siswa (siswa_id, mata_pelajaran, nilai, kelompok, updated_at) 
                  VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`, siswa_id, 'Matematika', nilai, kelompok);
    res.json({ success: true });
}

module.exports = { koreksiJawaban, simpanHasil };