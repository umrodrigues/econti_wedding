'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GiftItem, { GiftItemProps } from '../gift-item/GiftItem'
import Modal from '../modal/Modal'
import Carousel from '../carousel/Carousel'
import LoveStory from '../love-story/LoveStory'
import styles from './Content.module.scss'
import Header from '../header/Header'
import { FaRegLightbulb, FaHeart } from 'react-icons/fa'
import Footer from '../footer/Footer'

function LoadingSpinner() {
  return (
    <motion.div 
      className={styles.loadingContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={styles.loadingSpinner}
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <FaHeart className={styles.heartIcon} />
      </motion.div>
      <motion.p 
        className={styles.loadingText}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Carregando presentes com amor...
      </motion.p>
    </motion.div>
  )
}

function ShimmerGrid() {
  return (
    <motion.div 
      className={styles.shimmerGrid}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {Array(8).fill(0).map((_, i) => (
        <motion.div 
          key={i} 
          className={styles.shimmerCard}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        />
      ))}
    </motion.div>
  )
}

function ShimmerFooter() {
  return (
    <motion.div 
      className={styles.shimmerFooter}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    />
  )
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
      <motion.div 
        className={styles.floatingInfo}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <FaRegLightbulb className={styles.icon} />
        <p>Os valores exibidos são sugestões, contribua com o valor que desejar!</p>
      </motion.div>
      
      <Carousel />
      
      <LoveStory />
      
      <main className={styles.main}>
                <motion.h1
          className={`${styles.title} floral-decoration hexagon-frame`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Lista de Presentes
        </motion.h1>
        <motion.p 
          className={styles.subtitleInfo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          💡 Os valores são sugestões - contribua com o que desejar!
        </motion.p>
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingSpinner key="loading" />
          ) : (
            <motion.div 
              className={styles.grid}
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {gifts.map((gift, index) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GiftItem gift={gift} onShowModal={onShowModal} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <AnimatePresence mode="wait">
        {loading ? (
          <ShimmerFooter key="shimmer-footer" />
        ) : (
          <motion.div
            key="footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showModal && gift && (
          <Modal gift={gift} closeModal={closeModal} />
        )}
      </AnimatePresence>
    </>
  )
}
