-- Tabel siswa
CREATE TABLE IF NOT EXISTS siswa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nis TEXT UNIQUE NOT NULL,
    nama TEXT NOT NULL,
    kelas TEXT DEFAULT '3',
    jenis_kelamin TEXT CHECK(jenis_kelamin IN ('L','P')),
    catatan_guru TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel bank soal
CREATE TABLE IF NOT EXISTS bank_soal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mata_pelajaran TEXT CHECK(mata_pelajaran IN ('Matematika','IPA')),
    topik TEXT,
    jenis TEXT CHECK(jenis IN ('pilihan_ganda','isian','benar_salah','menjodohkan','uraian','soal_cerita')),
    level TEXT CHECK(level IN ('Mudah','Sedang','Sulit')),
    pertanyaan TEXT,
    opsi TEXT, -- JSON array untuk pilihan ganda
    kunci_jawaban TEXT,
    kompetensi TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel asesmen
CREATE TABLE IF NOT EXISTS asesmen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    judul TEXT,
    mata_pelajaran TEXT,
    tanggal DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel hasil asesmen
CREATE TABLE IF NOT EXISTS hasil_asesmen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asesmen_id INTEGER,
    siswa_id INTEGER,
    skor INTEGER,
    nilai INTEGER,
    jawaban_json TEXT, -- JSON array jawaban siswa
    analisis_json TEXT,
    FOREIGN KEY (asesmen_id) REFERENCES asesmen(id),
    FOREIGN KEY (siswa_id) REFERENCES siswa(id)
);

-- Tabel pengelompokan
CREATE TABLE IF NOT EXISTS kelompok_siswa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    siswa_id INTEGER,
    mata_pelajaran TEXT,
    nilai INTEGER,
    kelompok TEXT CHECK(kelompok IN ('A','B','C','D','E')),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (siswa_id) REFERENCES siswa(id)
);