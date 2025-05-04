import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await db.query('SELECT * FROM products');
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado' });
    }

    res.status(200).json({ products: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao conectar com o banco de dados' });
  }
}
