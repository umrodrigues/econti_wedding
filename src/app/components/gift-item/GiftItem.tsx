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

export default function GiftItem({ gift, onShowModal }: { gift: Gift, onShowModal: (gift: Gift) => void }) {
  const [quantity, setQuantity] = useState(0)

  const increment = () => setQuantity(prev => prev + 1)
  const decrement = () => setQuantity(prev => Math.max(prev - 1, 0))
  const confirm = () => onShowModal(gift)

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
      <span>{gift.total_price}</span>
      <button className={styles.confirmBtn} onClick={confirm}>Quero apoiar este casal</button>
    </div>
  )
}
