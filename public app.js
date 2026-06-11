// Routing Sederhana
const pages = ['dashboard', 'siswa', 'soal', 'banksoal', 'koreksi', 'analisis', 'laporan'];
let currentPage = 'dashboard';

function loadPage(page) {
    currentPage = page;
    document.querySelectorAll('.sidebar nav a').forEach(a => {
        a.classList.toggle('active', a.dataset.page === page);
    });
    document.getElementById('page-title').innerText = 
        page === 'dashboard' ? 'Dashboard' :
        page === 'siswa' ? 'Manajemen Siswa' :
        page === 'soal' ? 'Generator Soal AI' :
        page === 'banksoal' ? 'Bank Soal' :
        page === 'koreksi' ? 'Koreksi Jawaban' :
        page === 'analisis' ? 'Analisis Kompetensi' : 'Laporan';
    
    if (page === 'dashboard') renderDashboard();
    if (page === 'siswa') renderSiswa();
    if (page === 'soal') renderSoal();
    if (page === 'banksoal') renderBankSoal();
    if (page === 'koreksi') renderKoreksi();
    if (page === 'analisis') renderAnalisis();
    if (page === 'laporan') renderLaporan();
}

document.querySelectorAll('.sidebar nav a').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        loadPage(a.dataset.page);
    });
});

loadPage('dashboard');