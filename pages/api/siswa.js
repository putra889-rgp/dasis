import siswa from "../../data/siswa.json";

/**
 * Normalisasi teks:
 * - lowercase
 * - hapus spasi ganda
 */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Cek kemiripan:
 * - setiap kata query harus ada di nama
 */
function isSimilar(query, target) {
  const qWords = normalize(query).split(" ");
  const t = normalize(target);

  return qWords.every(word => t.includes(word));
}

export default function handler(req, res) {
  const { nama } = req.query;

  if (!nama) {
    return res.status(400).json({
      status: false,
      message: "Parameter nama wajib diisi"
    });
  }

  const hasil = siswa
    .filter(s => isSimilar(nama, s.nama))
    .map(s => ({
      nama: s.nama,
      jenis_kelamin: s.jenis_kelamin,
      tingkat: s.tingkat,
      rombel: s.rombel,
      tanggal_lahir: s.tanggal_lahir,
      nik: s.nik ? s.nik.slice(0, 6) + "******" : null,
      nisn: s.nisn ? s.nisn.slice(0, 3) + "******" : null,
      last_update: s.last_update
    }));

  if (hasil.length === 0) {
    return res.status(404).json({
      status: false,
      message: "Data siswa tidak ditemukan (nama mirip)"
    });
  }

  res.status(200).json({
    status: true,
    sekolah: "SMK Raden Paku",
    query: nama,
    total: hasil.length,
    results: hasil
  });
}
