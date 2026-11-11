
import siakData from '../datasiswasmkradenpaku.json';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'METHOD NOT ALLOWED'
    });
  }

  const nama = (req.query.nama || '').trim();

  if (!nama) {
    return res.status(400).json({
      error: 'NAMA HARUS DIISI'
    });
  }

  const result = siakData.find(item =>
    item.NAMA?.toLowerCase() === nama.toLowerCase()
  );

  if (result) {
    return res.status(200).json(result);
  }

  return res.status(404).json({
    error: 'NAMA TIDAK DITEMUKAN'
  });
}
