'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './Timeline.module.scss'

const timelineData = [
  {
    id: 1,
    image: '/casal/casal1.jpg',
    title: 'Nosso Primeiro Encontro',
    date: '2020',
    description: 'O dia em que nossos caminhos se cruzaram pela primeira vez'
  },
  {
    id: 2,
    image: '/casal/casal2.jpg',
    title: 'Primeiro Beijo',
    date: '2021',
    description: 'Um momento mágico que mudou nossas vidas para sempre'
  },
  {
    id: 3,
    image: '/casal/casal3.jpg',
    title: 'Primeira Viagem Juntos',
    date: '2022',
    description: 'Descobrindo o mundo lado a lado'
  },
  {
    id: 4,
    image: '/casal/casal4.jpg',
    title: 'O Pedido',
    date: '2023',
    description: 'O momento mais especial de nossas vidas'
  },
  {
    id: 5,
    image: '/casal/casal7.jpg',
    title: 'Preparativos do Casamento',
    date: '2024',
    description: 'Construindo nosso futuro juntos'
  },
  {
    id: 6,
    image: '/casal/casal8.jpg',
    title: 'Nossa História de Amor',
    date: 'Para Sempre',
    description: 'Uma jornada que apenas começou'
  }
]

export default function Timeline() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Nossa História de Amor
          </h2>
          
          <div className={styles.timeline}>
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
              >
                <div className={styles.timelineContent}>
                  <div className={styles.imageContainer}>
                            <Image
          src={item.image}
          alt={item.title}
          width={280}
          height={180}
          className={styles.timelineImage}
        />
                    <div className={styles.imageOverlay}>
                      <span className={styles.date}>{item.date}</span>
                    </div>
                  </div>
                  
                  <div className={styles.content}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.description}>{item.description}</p>
                  </div>
                </div>
                
                <div className={styles.timelineDot}>
                  <div className={styles.dot}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.finalMessage}>
            <h3>E agora...</h3>
            <p>Estamos prontos para começar nossa nova aventura juntos!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.timelineSection}>
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
          Nossa História de Amor
        </motion.h2>
        
        <div className={styles.timeline}>
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className={styles.timelineContent}>
                <motion.div 
                  className={styles.imageContainer}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    className={styles.timelineImage}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.date}>{item.date}</span>
                  </div>
                </motion.div>
                
                <div className={styles.content}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
              
              <div className={styles.timelineDot}>
                <div className={styles.dot}></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className={styles.finalMessage}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3>E agora...</h3>
          <p>Estamos prontos para começar nossa nova aventura juntos!</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
