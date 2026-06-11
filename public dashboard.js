async function renderDashboard() {
    const container = document.getElementById('page-container');
    container.innerHTML = `<div class="card-grid" id="stats-grid"></div>
                           <div class="card"><canvas id="kelasChart"></canvas></div>`;
    // Fetch data
    const siswaRes = await fetch('/api/siswa');
    const siswa = await siswaRes.json();
    const kelasRes = await fetch('/api/analisis/kelas');
    const kelasData = await kelasRes.json();
    
    document.getElementById('stats-grid').innerHTML = `
        <div class="card"><h3>Total Siswa</h3><div class="value">${siswa.length}</div></div>
        <div class="card"><h3>Rata-rata Nilai</h3><div class="value">${kelasData.rata?.toFixed(1) || 0}</div></div>
        <div class="card"><h3>Siswa Kelompok A</h3><div class="value">${kelasData.kelompokCount?.A || 0}</div></div>
        <div class="card"><h3>Siswa Kelompok E</h3><div class="value">${kelasData.kelompokCount?.E || 0}</div></div>
    `;
    const ctx = document.getElementById('kelasChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A (0-39)', 'B (40-59)', 'C (60-79)', 'D (80-89)', 'E (90-100)'],
            datasets: [{
                label: 'Jumlah Siswa',
                data: [kelasData.kelompokCount?.A||0, kelasData.kelompokCount?.B||0, kelasData.kelompokCount?.C||0, kelasData.kelompokCount?.D||0, kelasData.kelompokCount?.E||0],
                backgroundColor: '#3b82f6'
            }]
        }
    });
}