'use client'
import { useState } from 'react'
import Footer from './components/footer/Footer'
import GiftItem from './components/gift-item/GiftItem'
import Header from './components/header/Header'
import Modal from './components/modal/Modal'
import { giftsMock } from './weddings_mock'
import styles from './page.module.scss'

type Gift = {
  id: number
  name: string
  description: string
  price: string
  image: string
}

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [gift, setGift] = useState<Gift | null>(null)
  const [quantity, setQuantity] = useState(0)

  const onShowModal = (gift: Gift, quantity: number) => {
    setGift(gift)
    setQuantity(quantity)
    setShowModal(true)
  }

  const closeModal = () => setShowModal(false)

  return (
    <>
      {/* <Header /> */}
      <main className={styles.main}>
        <h1>Lista de Presentes Divertidos</h1>
        <div className={styles.grid}>
          {giftsMock.map((gift) => (
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

      {/* <Footer /> */}
    </>
  )
}
