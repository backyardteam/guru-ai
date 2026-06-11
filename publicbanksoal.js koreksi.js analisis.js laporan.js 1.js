// public/koreksi.js
async function renderKoreksi() {
    const container = document.getElementById('page-container');
    container.innerHTML = `<div class="card"><h2>Koreksi Jawaban</h2>
        <div class="form-group"><label>Soal (JSON)</label><textarea id="soalJson" rows="5" placeholder='[{"pertanyaan":"...","kunci_jawaban":"A"}]'></textarea></div>
        <div class="form-group"><label>Jawaban Siswa (array)</label><input id="jawaban" placeholder='["A","B","C"]'></div>
        <button onclick="koreksi()">Koreksi</button></div>
        <div id="hasilKoreksi"></div>`;
}
async function koreksi() {
    const soal = JSON.parse(document.getElementById('soalJson').value);
    const jawaban = JSON.parse(document.getElementById('jawaban').value);
    const res = await fetch('/api/koreksi', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({soal, jawabanSiswa: jawaban}) });
    const hasil = await res.json();
    document.getElementById('hasilKoreksi').innerHTML = `<pre>${JSON.stringify(hasil, null, 2)}</pre>`;
}