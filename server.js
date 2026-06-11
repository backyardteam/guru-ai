const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Impor modul database
const { initDatabase } = require("./database");

// Impor routes
const siswaRoutes = require("./routes/siswa");
const soalRoutes = require("./routes/soal");
const koreksiRoutes = require("./routes/koreksi");
const analisisRoutes = require("./routes/analisis");
const laporanRoutes = require("./routes/laporan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/siswa", siswaRoutes);
app.use("/api/soal", soalRoutes);
app.use("/api/koreksi", koreksiRoutes);
app.use("/api/analisis", analisisRoutes);
app.use("/api/laporan", laporanRoutes);

// Frontend Utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal memulai server:", err);
  });
