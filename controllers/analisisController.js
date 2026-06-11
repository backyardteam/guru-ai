const { getDb } = require('../database');
const aiService = require('../services/aiService');

async function analisisKompetensi(req, res) {
    const { siswaId, mataPelajaran, jawaban, soal } = req.body;
    const analisis = await aiService.analisisKompetensi(siswaId, mataPelajaran, jawaban, soal);
    res.json(analisis);
}

async function learningGap(req, res) {
    const { kelompokSaatIni, targetKelompok, kompetensiBelumDikuasai } = req.body;
    const gap = await aiService.learningGapAnalysis(kelompokSaatIni, targetKelompok, kompetensiBelumDikuasai);
    res.json(gap);
}

async function treatment(req, res) {
    const { kompetensiBelumDikuasai, durasi } = req.body;
    const treatment = await aiService.generateTreatment(kompetensiBelumDikuasai, durasi);
    res.json(treatment);
}

async function analisisKelas(req, res) {
    const db = getDb();
    const hasil = await db.all(`
        SELECT s.nama, k.nilai, k.kelompok 
        FROM kelompok_siswa k 
        JOIN siswa s ON k.siswa_id = s.id 
        WHERE k.mata_pelajaran = 'Matematika'
    `);
    const nilaiList = hasil.map(h => h.nilai).filter(v => v !== null);
    const rata = nilaiList.reduce((a,b) => a+b,0) / nilaiList.length;
    const kelompokCount = { A:0, B:0, C:0, D:0, E:0 };
    hasil.forEach(h => kelompokCount[h.kelompok]++);
    res.json({ rata, median: nilaiList.sort((a,b)=>a-b)[Math.floor(nilaiList.length/2)], kelompokCount });
}

module.exports = { analisisKompetensi, learningGap, treatment, analisisKelas };