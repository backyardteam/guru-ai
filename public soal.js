async function renderSoal() {
    const container = document.getElementById('page-container');
    container.innerHTML = `<div class="card"><h2>Generate Soal dengan AI</h2>
        <div class="form-group"><label>Mata Pelajaran</label><select id="mapel"><option>Matematika</option><option>IPA</option></select></div>
        <div class="form-group"><label>Topik</label><input id="topik" placeholder="Contoh: Perkalian, Makhluk Hidup"></div>
        <div class="form-group"><label>Jumlah Soal</label><input id="jumlah" type="number" value="5"></div>
        <div class="form-group"><label>Level</label><select id="level"><option>Mudah</option><option>Sedang</option><option>Sulit</option></select></div>
        <div class="form-group"><label>Jenis Soal</label><select id="jenis"><option>pilihan_ganda</option><option>isian</option><option>benar_salah</option><option>uraian</option><option>soal_cerita</option></select></div>
        <button onclick="generateSoal()">Generate Soal</button></div>
        <div id="soalResult"></div>`;
}

async function generateSoal() {
    const data = {
        mataPelajaran: document.getElementById('mapel').value,
        topik: document.getElementById('topik').value,
        jumlah: parseInt(document.getElementById('jumlah').value),
        level: document.getElementById('level').value,
        jenis: document.getElementById('jenis').value
    };
    const res = await fetch('/api/soal/generate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
    const soal = await res.json();
    const container = document.getElementById('soalResult');
    container.innerHTML = `<h3>Hasil Generate</h3><pre>${JSON.stringify(soal, null, 2)}</pre><button onclick="simpanSoalBatch(soal)">Simpan ke Bank Soal</button>`;
    window.soalBatch = soal;
}
async function simpanSoalBatch(soalArr) { /* simpan satu per satu */ alert('Disimpan'); }