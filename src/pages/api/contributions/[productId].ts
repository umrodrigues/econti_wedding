import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../lib/db'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query

  if (!productId || Array.isArray(productId)) {
    return res.status(400).json({ message: 'ID do produto inválido' })
  }

  try {
    const result = await db.query(
      'SELECT id, user_name, amount, created_at FROM contributions WHERE product_id = $1 ORDER BY created_at DESC',
      [productId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Nenhuma contribuição encontrada para este produto' })
    }

    res.status(200).json({ contributions: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar contribuições no banco de dados' })
  }
}
