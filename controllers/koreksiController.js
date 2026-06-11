const { getDb } = require("../database");
const aiService = require("../aiService");

async function koreksiJawaban(req, res) {
  try {
    const { soal, jawabanSiswa } = req.body;
    let benar = 0;

    const hasil = soal.map((s, idx) => {
      const isBenar = s.kunci_jawaban === jawabanSiswa[idx];
      if (isBenar) benar++;
      return {
        pertanyaan: s.pertanyaan,
        jawabanSiswa: jawabanSiswa[idx],
        kunci: s.kunci_jawaban,
        benar: isBenar,
      };
    });

    const nilai = Math.round((benar / soal.length) * 100);
    res.json({ benar, total: soal.length, nilai, hasilDetail: hasil });
  } catch (err) {
    console.error("Error koreksiJawaban:", err);
    res.status(500).json({ error: "Gagal melakukan koreksi" });
  }
}

async function simpanHasil(req, res) {
  try {
    const { asesmen_id, siswa_id, jawaban_json, nilai, analisis_json } =
      req.body;
    const db = getDb();

    await db.run(
      "INSERT INTO hasil_asesmen (asesmen_id, siswa_id, jawaban_json, nilai, analisis_json) VALUES (?, ?, ?, ?, ?)",
      [
        asesmen_id,
        siswa_id,
        JSON.stringify(jawaban_json),
        nilai,
        JSON.stringify(analisis_json),
      ],
    );

    // Logika penentuan kelompok
    let kelompok = "E";
    if (nilai <= 39) kelompok = "A";
    else if (nilai <= 59) kelompok = "B";
    else if (nilai <= 79) kelompok = "C";
    else if (nilai <= 89) kelompok = "D";

    // Update kelompok_siswa
    await db.run(
      `INSERT OR REPLACE INTO kelompok_siswa (siswa_id, mata_pelajaran, nilai, kelompok) VALUES (?, ?, ?, ?)`,
      [siswa_id, "Matematika", nilai, kelompok],
    );

    res.status(201).json({ success: true, kelompok });
  } catch (err) {
    console.error("Error simpanHasil:", err);
    res.status(500).json({ error: "Gagal menyimpan hasil" });
  }
}

module.exports = { koreksiJawaban, simpanHasil };
