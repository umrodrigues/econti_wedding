'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './GiftItem.module.scss'

type Gift = {
  id: number
  name: string
  description: string
  total_price: string
  image_url: string
}

export default function GiftItem({ gift, onShowModal }: { gift: Gift, onShowModal: (gift: Gift, quantity: number) => void }) {
  const [quantity, setQuantity] = useState(0)

  const increment = () => setQuantity(prev => prev + 1)
  const decrement = () => setQuantity(prev => Math.max(prev - 1, 0))
  const confirm = () => quantity > 0 && onShowModal(gift, quantity)

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={gift.image_url}
          alt={gift.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h2>{gift.name}</h2>
      <p>{gift.description}</p>
      <span>{gift.total_price}</span>
      <div className={styles.picker}>
        <button onClick={decrement}>-</button>
        <span>{quantity}</span>
        <button onClick={increment}>+</button>
      </div>
      <button className={styles.confirmBtn} onClick={confirm}>Confirmar</button>
    </div>
  )
}
