const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { initDatabase } = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes dengan pengecekan require
app.use("/api/siswa", require("./routes/siswa"));
app.use("/api/soal", require("./routes/soal"));
app.use("/api/koreksi", require("./routes/koreksi"));
app.use("/api/analisis", require("./routes/analisis"));
app.use("/api/laporan", require("./routes/laporan"));

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
