const { getDb } = require("../database");
const ExcelJS = require("exceljs");

async function getAllSiswa(req, res) {
  const db = getDb();
  const siswa = await db.all("SELECT * FROM siswa ORDER BY nama");
  res.json(siswa);
}

async function getSiswaById(req, res) {
  const db = getDb();
  const siswa = await db.get("SELECT * FROM siswa WHERE id = ?", req.params.id);
  res.json(siswa);
}

async function createSiswa(req, res) {
  const { nis, nama, kelas, jenis_kelamin, catatan_guru } = req.body;
  const db = getDb();
  try {
    await db.run(
      "INSERT INTO siswa (nis, nama, kelas, jenis_kelamin, catatan_guru) VALUES (?, ?, ?, ?, ?)",
      nis,
      nama,
      kelas || "3",
      jenis_kelamin,
      catatan_guru,
    );
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateSiswa(req, res) {
  const { nis, nama, kelas, jenis_kelamin, catatan_guru } = req.body;
  const db = getDb();
  await db.run(
    "UPDATE siswa SET nis = ?, nama = ?, kelas = ?, jenis_kelamin = ?, catatan_guru = ? WHERE id = ?",
    nis,
    nama,
    kelas,
    jenis_kelamin,
    catatan_guru,
    req.params.id,
  );
  res.json({ success: true });
}

async function deleteSiswa(req, res) {
  const db = getDb();
  await db.run("DELETE FROM siswa WHERE id = ?", req.params.id);
  res.json({ success: true });
}

async function importCSV(req, res) {
  const db = getDb();
  const { data } = req.body; // array of objects
  for (const row of data) {
    await db.run(
      "INSERT OR REPLACE INTO siswa (nis, nama, kelas, jenis_kelamin) VALUES (?, ?, ?, ?)",
      row.nis,
      row.nama,
      row.kelas || "3",
      row.jenis_kelamin,
    );
  }
  res.json({ success: true });
}

async function exportExcel(req, res) {
  const db = getDb();
  const siswa = await db.all("SELECT * FROM siswa ORDER BY nama");
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Siswa");
  worksheet.columns = [
    { header: "NIS", key: "nis", width: 15 },
    { header: "Nama", key: "nama", width: 30 },
    { header: "Kelas", key: "kelas", width: 10 },
    { header: "Jenis Kelamin", key: "jenis_kelamin", width: 15 },
    { header: "Catatan", key: "catatan_guru", width: 40 },
  ];
  siswa.forEach((s) => worksheet.addRow(s));
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );
  res.setHeader("Content-Disposition", "attachment; filename=siswa.xlsx");
  await workbook.xlsx.write(res);
  res.end();
}

module.exports = {
  getAllSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
  importCSV,
  exportExcel,
};
