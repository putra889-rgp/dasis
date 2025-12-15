import siakData from '../datasiswasmkradenpaku.json';

export default function handler(req, res) {
  const nik = (req.query.nama || '').trim();

  if (!nik) {
    return res.status(400).json({ error: 'NAMA HARUS DIISI' });
  }

  // Cari data berdasarkan properti "NIK" (huruf besar)
  const result = siakData.find(item => item.NAMA === nama);

  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ error: 'NAMA tidak benar' });
  }
}
