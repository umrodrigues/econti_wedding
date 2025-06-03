import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  if (!productId || Array.isArray(productId)) {
    return res.status(400).json({ message: 'ID do produto inválido' })
  }

  const { user_name, amount } = req.body

  if (!user_name || !amount) {
    return res.status(400).json({ message: 'Nome e valor são obrigatórios' })
  }

  try {
    await db.query('BEGIN')

    await db.query(
      'INSERT INTO contributions (user_name, product_id, amount, created_at) VALUES ($1, $2, $3, NOW())',
      [user_name, productId, amount]
    )

    await db.query(
      'UPDATE products SET remaining_price = remaining_price - $1 WHERE id = $2',
      [amount, productId]
    )

    await db.query('COMMIT')

    res.status(201).json({ message: 'Contribuição registrada com sucesso' })
  } catch (err) {
    await db.query('ROLLBACK')
    console.error(err)
    res.status(500).json({ message: 'Erro ao registrar contribuição e atualizar produto' })
  }
}
