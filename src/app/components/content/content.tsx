'use client'
import { useState, useEffect } from 'react'
import GiftItem, { GiftItemProps } from '../gift-item/GiftItem'
import Modal from '../modal/Modal'
import styles from './Content.module.scss'
import Header from '../header/Header'


export default function Content() {
  const [showModal, setShowModal] = useState(false)
  const [gift, setGift] = useState<GiftItemProps | null>(null)
  const [gifts, setGifts] = useState<GiftItemProps[]>([])

  useEffect(() => {
    const fetchGifts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setGifts(data.products);
    };

    fetchGifts();
  }, []);

  const onShowModal = (gift: GiftItemProps) => {
    setGift(gift)
    setShowModal(true)
  }

  const closeModal = () => setShowModal(false)

  return (
    <>

    <Header />

      <main className={styles.main}>
        <h1>Lista de Presentes</h1>
        <div className={styles.grid}>
          {gifts.map((gift) => (
            <GiftItem key={gift.id} gift={gift} onShowModal={onShowModal} />
          ))}
        </div>
      </main>

      {showModal && gift && (
        <Modal
          gift={gift}
          closeModal={closeModal}
        />
      )}
    </>
  )
}
