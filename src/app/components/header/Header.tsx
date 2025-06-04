'use client'

import { useState } from 'react'
import styles from './Header.module.scss'
import ConfirmationPresenceContent from '../confirmation-presence/content/confirmation-presence-content'

export default function Header() {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.title}>Econti Wedding 💍</h2>
        <button onClick={handleClick} className={styles.button}>
          Confirmação de presença
        </button>
      </div>

      {/* {showConfirmation && <ConfirmationPresenceContent />} */}
    </header>
  )
}
