const axios = require("axios");

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = "https://api.deepseek.com/v1/chat/completions";

async function generateSoal(mataPelajaran, topik, jumlah, level, jenis) {
  const prompt = `Buatlah ${jumlah} soal ${mataPelajaran} untuk kelas 3 SD, topik: ${topik}, tingkat kesulitan: ${level}, jenis soal: ${jenis}. 
    Setiap soal harus dalam format JSON dengan struktur:
    {
        "pertanyaan": "...",
        "opsi": ["A. ...", "B. ...", "C. ...", "D. ..."] (jika pilihan ganda, jika isian/uraian null),
        "kunci_jawaban": "...",
        "kompetensi": "..."
}
    Berikan array JSON. Jangan tambahkan teks lain.`;

  const response = await axios.post(
    API_URL,
    {
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  const content = response.data.choices[0].message.content;
  const soal = JSON.parse(content);
  return soal;
}

async function analisisKompetensi(
  siswaId,
  mataPelajaran,
  jawabanArray,
  soalArray,
) {
  const prompt = `Analisis kompetensi siswa kelas 3 SD pada mata pelajaran ${mataPelajaran}. 
    Jawaban siswa: ${JSON.stringify(jawabanArray)}. Soal: ${JSON.stringify(soalArray)}.
    Berikan JSON: 
    {
        "dikuasai": ["kompetensi1", "kompetensi2"],
        "belum_dikuasai": ["kompetensi3"],
        "perlu_penguatan": ["kompetensi4"],
        "rekomendasi": "teks rekomendasi"
    }`;

  const response = await axios.post(
    API_URL,
    {
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    },
    {
      headers: {
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return JSON.parse(response.data.choices[0].message.content);
}

async function learningGapAnalysis(
  kelompokSaatIni,
  targetKelompok,
  kompetensiBelumDikuasai,
) {
  const prompt = `Siswa berada di kelompok ${kelompokSaatIni} (0-39=A,40-59=B,60-79=C,80-89=D,90-100=E). Target naik ke kelompok ${targetKelompok}. Kompetensi yang belum dikuasai: ${kompetensiBelumDikuasai}. Berikan JSON: {"kompetensi_kurang": [...], "prioritas_belajar": [...], "urgensi": "Tinggi/Sedang/Rendah"}`;
  const response = await axios.post(
    API_URL,
    {
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    },
    {
      headers: {
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );
  return JSON.parse(response.data.choices[0].message.content);
}

async function generateTreatment(kompetensiBelumDikuasai, durasi) {
  const prompt = `Buat program ${durasi} (1 minggu/2 minggu/1 bulan) untuk siswa SD kelas 3 yang belum menguasai kompetensi: ${kompetensiBelumDikuasai}. Berikan JSON: {"tujuan": "...", "materi": [...], "aktivitas": [...], "jumlah_latihan": ..., "indikator_keberhasilan": "...", "evaluasi": "..."}`;
  const response = await axios.post(
    API_URL,
    {
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    },
    {
      headers: {
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );
  return JSON.parse(response.data.choices[0].message.content);
}

module.exports = {
  generateSoal,
  analisisKompetensi,
  learningGapAnalysis,
  generateTreatment,
};
