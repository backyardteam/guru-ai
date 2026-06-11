const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { initDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
const siswaRoutes = require('./routes/siswa');
const soalRoutes = require('./routes/soal');
const koreksiRoutes = require('./routes/koreksi');
const analisisRoutes = require('./routes/analisis');
const laporanRoutes = require('./routes/laporan');

app.use('/api/siswa', siswaRoutes);
app.use('/api/soal', soalRoutes);
app.use('/api/koreksi', koreksiRoutes);
app.use('/api/analisis', analisisRoutes);
app.use('/api/laporan', laporanRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`AI Teacher Assistant running on http://localhost:${PORT}`);
    });
});