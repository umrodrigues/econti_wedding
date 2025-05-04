'use client'
import { useState, useEffect } from 'react'
import GiftItem from '../gift-item/GiftItem'
import Modal from '../modal/Modal'
import styles from './Content.module.scss'

type Gift = {
  id: number
  name: string
  description: string
  total_price: string
  image_url: string
}

export default function Content() {
  const [showModal, setShowModal] = useState(false)
  const [gift, setGift] = useState<Gift | null>(null)
  const [quantity, setQuantity] = useState(0)
  const [gifts, setGifts] = useState<Gift[]>([])

  useEffect(() => {
    const fetchGifts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setGifts(data.products);
    };

    fetchGifts();
  }, []);

  const onShowModal = (gift: Gift, quantity: number) => {
    setGift(gift)
    setQuantity(quantity)
    setShowModal(true)
  }

  const closeModal = () => setShowModal(false)

  return (
    <>
      <main className={styles.main}>
        <h1>Lista de Presentes Divertidos</h1>
        <div className={styles.grid}>
          {gifts.map((gift) => (
            <GiftItem key={gift.id} gift={gift} onShowModal={onShowModal} />
          ))}
        </div>
      </main>

      {showModal && gift && (
        <Modal
          gift={gift}
          quantity={quantity}
          closeModal={closeModal}
        />
      )}
    </>
  )
}
