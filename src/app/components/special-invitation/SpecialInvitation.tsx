'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import styles from './SpecialInvitation.module.scss'

interface CookieData {
  hasSeenInvitation: boolean
}

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

const FallingElement = ({ delay, duration, left }: { delay: number, duration: number, left: number }) => {
  const elements = ['💕', '🌹', '💖', '✨', '🌸', '💝']
  const randomElement = elements[Math.floor(Math.random() * elements.length)]
  
  return (
    <motion.div
      className={styles.fallingElement}
      initial={{ 
        y: -100, 
        x: left,
        rotate: 0,
        opacity: 0 
      }}
      animate={{ 
        y: window.innerHeight + 100, 
        x: left + (Math.random() - 0.5) * 100,
        rotate: 360,
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: duration,
        delay: delay,
        ease: "easeIn"
      }}
      style={{ left: `${left}%` }}
    >
      {randomElement}
    </motion.div>
  )
}

export default function SpecialInvitation() {
  const [showInvitation, setShowInvitation] = useState(false)
  const [mounted, setMounted] = useState(false)

  const handleCloseInvitation = () => {
    setShowInvitation(false)
    setCookie('weddingInvitation', JSON.stringify({ hasSeenInvitation: true }))
  }

  useEffect(() => {
    setMounted(true)
    
    const cookieData = getCookie('weddingInvitation')
    const hasSeenInvitation = cookieData ? JSON.parse(cookieData).hasSeenInvitation : false
    
    if (!hasSeenInvitation) {
      setTimeout(() => {
        setShowInvitation(true)
      }, 1000)
    }
  }, [])

  useEffect(() => {
    if (showInvitation) {
      const timer = setTimeout(() => {
        handleCloseInvitation()
      }, 7000)

      return () => clearTimeout(timer)
    }
  }, [showInvitation])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {showInvitation && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.fallingElements}>
            {Array.from({ length: 15 }).map((_, index) => (
              <FallingElement
                key={index}
                delay={index * 0.2}
                duration={3 + Math.random() * 2}
                left={Math.random() * 100}
              />
            ))}
          </div>

          <motion.div
            className={styles.invitationCard}
            initial={{ 
              scale: 0.3, 
              opacity: 0,
              y: 50
            }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: 0
            }}
            exit={{ 
              scale: 0.3, 
              opacity: 0,
              y: -50
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              duration: 0.8
            }}
          >
            <div className={styles.lottieContainer}>
              <DotLottieReact
                src="https://lottie.host/a4a4eff7-a1b7-4bd1-a00d-431e89d34863/0RjTwpflav.lottie"
                loop
                autoplay
                className={styles.lottieAnimation}
              />
            </div>

            <motion.div
              className={styles.invitationContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className={styles.invitationTitle}>
                Convite Especial
              </h2>
              <p className={styles.invitationMessage}>
                Você é nosso convidado de honra
              </p>
              <div className={styles.hearts}>
                <span>💕</span>
                <span>💖</span>
                <span>💕</span>
              </div>
            </motion.div>

            <motion.button
              className={styles.closeButton}
              onClick={handleCloseInvitation}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✨
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
