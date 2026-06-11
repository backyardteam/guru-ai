async function renderSiswa() {
    const container = document.getElementById('page-container');
    container.innerHTML = `<div style="margin-bottom:20px"><button onclick="showTambahSiswa()">+ Tambah Siswa</button>
                           <button class="secondary" onclick="exportExcel()">Export Excel</button></div>
                           <div class="table-container"><table id="siswa-table"><thead><tr><th>NIS</th><th>Nama</th><th>Kelas</th><th>JK</th><th>Aksi</th></tr></thead><tbody></tbody></table></div>`;
    await loadSiswaTable();
}

async function loadSiswaTable() {
    const res = await fetch('/api/siswa');
    const siswa = await res.json();
    const tbody = document.querySelector('#siswa-table tbody');
    tbody.innerHTML = siswa.map(s => `
        <tr>
            <td>${s.nis}</td><td>${s.nama}</td><td>${s.kelas}</td><td>${s.jenis_kelamin}</td>
            <td><button onclick="editSiswa(${s.id})">Edit</button> <button class="danger" onclick="hapusSiswa(${s.id})">Hapus</button></td>
        </tr>
    `).join('');
}

async function showTambahSiswa() { showModalSiswa(); }
async function editSiswa(id) { showModalSiswa(id); }

function showModalSiswa(id = null) {
    const modal = document.createElement('div'); modal.className = 'modal';
    modal.innerHTML = `<div class="modal-content"><h2>${id ? 'Edit' : 'Tambah'} Siswa</h2>
        <div class="form-group"><label>NIS</label><input id="nis"></div>
        <div class="form-group"><label>Nama</label><input id="nama"></div>
        <div class="form-group"><label>Kelas</label><input id="kelas" value="3"></div>
        <div class="form-group"><label>Jenis Kelamin</label><select id="jk"><option>L</option><option>P</option></select></div>
        <div style="display:flex; gap:10px"><button id="saveBtn">Simpan</button><button class="secondary" onclick="this.closest('.modal').remove()">Batal</button></div>
    </div>`;
    document.body.appendChild(modal);
    if (id) {
        fetch(`/api/siswa/${id}`).then(r=>r.json()).then(data => {
            document.getElementById('nis').value = data.nis;
            document.getElementById('nama').value = data.nama;
            document.getElementById('kelas').value = data.kelas;
            document.getElementById('jk').value = data.jenis_kelamin;
            document.getElementById('saveBtn').onclick = () => updateSiswa(id);
        });
    } else {
        document.getElementById('saveBtn').onclick = () => createSiswa();
    }
}

async function createSiswa() {
    const nis = document.getElementById('nis').value;
    const nama = document.getElementById('nama').value;
    const kelas = document.getElementById('kelas').value;
    const jenis_kelamin = document.getElementById('jk').value;
    await fetch('/api/siswa', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({nis,nama,kelas,jenis_kelamin}) });
    document.querySelector('.modal').remove();
    loadSiswaTable();
}
async function updateSiswa(id) { /* mirip create dengan PUT */ }
async function hapusSiswa(id) { if(confirm('Hapus?')){ await fetch(`/api/siswa/${id}`,{method:'DELETE'}); loadSiswaTable(); } }
async function exportExcel() { window.open('/api/siswa/export/excel', '_blank'); }