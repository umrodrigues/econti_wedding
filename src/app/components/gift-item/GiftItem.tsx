'use client'
import Image from 'next/image'
import styles from './GiftItem.module.scss'

type Gift = {
  id: number
  name: string
  total_price: string
  image_url: string
  remaining_price: string
}

export default function GiftItem({ gift, onShowModal }: { gift: Gift, onShowModal: (gift: Gift) => void }) {

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
      <p>Valor restante: {gift.remaining_price}</p>
      <button className={styles.confirmBtn} onClick={confirm}>Quero apoiar este casal</button>
    </div>
  )
}
