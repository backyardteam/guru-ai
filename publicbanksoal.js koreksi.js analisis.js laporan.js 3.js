// public/laporan.js
async function renderLaporan() {
    const container = document.getElementById('page-container');
    container.innerHTML = `<div class="card-grid">
        <div class="card"><button onclick="downloadPDFSiswa()">Download PDF Laporan Siswa</button></div>
        <div class="card"><button onclick="downloadPDFKelas()">Download PDF Laporan Kelas</button></div>
    </div>`;
}
function downloadPDFSiswa() { const id = prompt('Masukkan ID siswa:'); window.open(`/api/laporan/siswa/${id}/pdf`, '_blank'); }
function downloadPDFKelas() { window.open('/api/laporan/kelas/pdf', '_blank'); }