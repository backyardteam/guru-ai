const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const { getDb } = require('../database');

async function generatePDFSiswa(req, res) {
    const db = getDb();
    const siswa = await db.get('SELECT * FROM siswa WHERE id = ?', req.params.id);
    const kelompok = await db.get('SELECT * FROM kelompok_siswa WHERE siswa_id = ?', req.params.id);
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=laporan_${siswa.nama}.pdf`);
    doc.pipe(res);
    doc.fontSize(20).text('Laporan Hasil Belajar Siswa', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Nama: ${siswa.nama}`);
    doc.text(`NIS: ${siswa.nis}`);
    doc.text(`Kelas: ${siswa.kelas}`);
    if (kelompok) {
        doc.text(`Nilai Terakhir: ${kelompok.nilai}`);
        doc.text(`Kelompok: ${kelompok.kelompok} - ${getKelompokKategori(kelompok.kelompok)}`);
    }
    doc.end();
}

function getKelompokKategori(kel) {
    const map = { A: 'Sangat Perlu Pendampingan', B: 'Perlu Penguatan Dasar', C: 'Cukup', D: 'Mahir', E: 'Unggul' };
    return map[kel];
}

async function generatePDFKelas(req, res) {
    const db = getDb();
    const hasil = await db.all(`
        SELECT s.nama, k.nilai, k.kelompok 
        FROM kelompok_siswa k 
        JOIN siswa s ON k.siswa_id = s.id
    `);
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=laporan_kelas.pdf');
    doc.pipe(res);
    doc.fontSize(20).text('Laporan Analisis Kelas', { align: 'center' });
    doc.moveDown();
    hasil.forEach(h => {
        doc.text(`${h.nama} - Nilai: ${h.nilai || '-'} - Kelompok: ${h.kelompok || '-'}`);
    });
    doc.end();
}

async function exportExcelSiswa(req, res) {
    const db = getDb();
    const siswa = await db.all('SELECT * FROM siswa');
    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('Siswa');
    ws.columns = [
        { header: 'NIS', key: 'nis', width: 15 },
        { header: 'Nama', key: 'nama', width: 30 },
        { header: 'Kelas', key: 'kelas', width: 10 },
        { header: 'Jenis Kelamin', key: 'jenis_kelamin', width: 15 }
    ];
    siswa.forEach(s => ws.addRow(s));
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=siswa.xlsx');
    await workbook.xlsx.write(res);
    res.end();
}

module.exports = { generatePDFSiswa, generatePDFKelas, exportExcelSiswa };