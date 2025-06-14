'use client'
import { useState, useEffect } from 'react'
import GiftItem, { GiftItemProps } from '../gift-item/GiftItem'
import Modal from '../modal/Modal'
import styles from './Content.module.scss'
import Header from '../header/Header'
import { FaRegLightbulb } from 'react-icons/fa'
import Footer from '../footer/Footer'
import MovingHeart from '../moving-heart/MovingHeart'

function ShimmerGrid() {
  return (
    <div className={styles.shimmerGrid}>
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className={styles.shimmerCard}></div>
      ))}
    </div>
  )
}

function ShimmerFooter() {
  return <div className={styles.shimmerFooter}></div>
}

export default function Content() {
  const [showModal, setShowModal] = useState(false)
  const [gift, setGift] = useState<GiftItemProps | null>(null)
  const [gifts, setGifts] = useState<GiftItemProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGifts = async () => {
      setLoading(true)
      const response = await fetch('/api/products')
      const data = await response.json()
      setGifts(data.products)
      setLoading(false)
    }
    fetchGifts()
  }, [])

  const onShowModal = (gift: GiftItemProps) => {
    setGift(gift)
    setShowModal(true)
  }

  const closeModal = () => setShowModal(false)

  return (
    <>
      <Header />
      <div className={styles.floatingInfo}>
        <FaRegLightbulb className={styles.icon} />
        Os valores exibidos são sugestões, contribua com o valor que desejar!
      </div>
      <main className={styles.main}>
        <h1>Lista de Presentes</h1>
        {loading ? (
          <ShimmerGrid />
        ) : (
          <div className={styles.grid}>
            {gifts.map((gift) => (
              <GiftItem key={gift.id} gift={gift} onShowModal={onShowModal} />
            ))}
          </div>
        )}
      </main>
      {loading ? <ShimmerFooter /> : <Footer />}
      {showModal && gift && <Modal gift={gift} closeModal={closeModal} />}
      <MovingHeart />
    </>
  )
}
