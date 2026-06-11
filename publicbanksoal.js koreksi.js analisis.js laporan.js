// public/banksoal.js
async function renderBankSoal() {
    const res = await fetch('/api/soal');
    const soal = await res.json();
    const container = document.getElementById('page-container');
    container.innerHTML = `<div class="table-container"><table><thead><tr><th>Pertanyaan</th><th>Mapel</th><th>Level</th><th>Aksi</th></tr></thead><tbody>
        ${soal.map(s => `<tr><td>${s.pertanyaan.substring(0,50)}</td><td>${s.mata_pelajaran}</td><td>${s.level}</td><td><button onclick="deleteSoal(${s.id})">Hapus</button></td></tr>`).join('')}
    </tbody></table></div>`;
}
async function deleteSoal(id) { await fetch(`/api/soal/${id}`,{method:'DELETE'}); renderBankSoal(); }