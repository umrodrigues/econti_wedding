'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './Carousel.module.scss'

const carouselData = [
  {
    id: 1,
    image: '/timeline/0.jpg',
    year: '2014'
  },
  {
    id: 2,
    image: '/timeline/1.jpg',
    year: '2015'
  },
  {
    id: 3,
    image: '/timeline/2.jpg',
    year: '2016'
  },
  {
    id: 4,
    image: '/timeline/3.jpg',
    year: '2017'
  },
  {
    id: 5,
    image: '/timeline/4.jpg',
    year: '2018'
  },
  {
    id: 6,
    image: '/timeline/5.jpg',
    year: '2019'
  },
  {
    id: 7,
    image: '/timeline/6.jpg',
    year: '2020'
  },
  {
    id: 8,
    image: '/timeline/7.jpg',
    year: '2021'
  },
  {
    id: 9,
    image: '/timeline/8.jpg',
    year: '2022'
  },
  {
    id: 10,
    image: '/timeline/9.jpg',
    year: '2023'
  },
  {
    id: 11,
    image: '/timeline/10.jpg',
    year: '2024'
  }
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselData.length - 1 : currentIndex - 1)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselData.length - 1 ? 0 : currentIndex + 1)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  if (!isMounted) {
    return (
      <section className={styles.carouselSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Nossa Jornada de Amor
          </h2>
          
          <div className={styles.carousel}>
            <div className={styles.slideContainer}>
              <div className={styles.slide}>
                <div className={styles.imageContainer}>
                  <Image
                    src={carouselData[0].image}
                    alt={`Foto do casal - ${carouselData[0].year}`}
                    width={400}
                    height={300}
                    className={styles.slideImage}
                  />
                </div>
                <div className={styles.slideContent}>
                  <span className={styles.year}>{carouselData[0].year}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.indicators}>
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === 0 ? styles.active : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.carouselSection}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Nossa Jornada de Amor
        </motion.h2>
        
        <div className={styles.carousel}>
          <div className={styles.slideContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className={styles.slide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.div 
                  className={styles.imageContainer}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Image
                    src={carouselData[currentIndex].image}
                    alt={`Foto do casal - ${carouselData[currentIndex].year}`}
                    width={500}
                    height={350}
                    className={styles.slideImage}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.year}>{carouselData[currentIndex].year}</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className={styles.slideContent}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <button 
            className={styles.navButton} 
            onClick={goToPrevious}
            aria-label="Slide anterior"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            className={`${styles.navButton} ${styles.nextButton}`} 
            onClick={goToNext}
            aria-label="Próximo slide"
          >
            <FaChevronRight />
          </button>
          
          <div className={styles.indicators}>
            {carouselData.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
