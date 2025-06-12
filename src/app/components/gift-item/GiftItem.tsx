'use client'
import Image from 'next/image'
import styles from './GiftItem.module.scss'

export type GiftItemProps = {
  id: number
  name: string
  total_price: string
  image_url: string
  remaining_price: string
}

export default function GiftItem({ gift, onShowModal }: { gift: GiftItemProps, onShowModal: (gift: GiftItemProps) => void }) {
  const confirm = () => onShowModal(gift)

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={gift.image_url}
          alt={gift.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h2>{gift.name}</h2>
      <span>{gift.total_price}</span>
      <p>Valor restante: {gift.remaining_price}</p>
      <button className={styles.confirmBtn} onClick={confirm}>Quero apoiar este casal</button>
    </div>
  )
}

