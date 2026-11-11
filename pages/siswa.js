import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'datasiswasmkradenpaku.json');
const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const siakData = Array.isArray(raw) ? raw : [raw];

function getField(obj, key) {
  if (obj == null) return undefined;
  if (key in obj) return obj[key];
  const found = Object.keys(obj).find(k => k.toLowerCase() === key.toLowerCase());
  return found ? obj[found] : undefined;
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'METHOD NOT ALLOWED' });
  }

  const rawQ = req.query.nama;
  const nama = (Array.isArray(rawQ) ? rawQ[0] : rawQ || '').trim();

  if (!nama) {
    return res.status(400).json({ error: 'NAMA HARUS DIISI' });
  }

  const needle = nama.toLowerCase();

  let result = siakData.find(item => {
    const n = getField(item, 'nama');
    return typeof n === 'string' && n.toLowerCase() === needle;
  });

  if (!result) {
    result = siakData.find(item => {
      const n = getField(item, 'nama');
      return typeof n === 'string' && n.toLowerCase().includes(needle);
    });
  }

  if (result) {
    return res.status(200).json(result);
  }

  return res.status(404).json({ error: 'NAMA TIDAK DITEMUKAN' });
}
