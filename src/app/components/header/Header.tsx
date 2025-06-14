'use client'

import { useState } from 'react'
import styles from './Header.module.scss'

export default function Header() {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.title}>Econti Wedding 💍</h2>
        <div className={styles.buttonGroup}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfh3tQ3YFg6BTUrEIY0opCGBc2Qu-TYEAFYEaVYUHECYv2Dfw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Confirmação de presença
          </a>
          <button className={styles.button} onClick={handleOpenModal}>
            Reserva de Cabana
          </button>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ×
            </button>
            <h3>Reserva de Cabana 🏨</h3>
            <p>
              O casamento acontecerá no dia <strong>14/06 às 16h</strong>. Para facilitar sua hospedagem, sugerimos reservar com o hotel parceiro.
            </p>
            <p>
              Entre em contato com o hotel informando que participará do casamento Econti Wedding para obter condições especiais.
            </p>
            <a
              href="https://wa.me/555195755227?text=Olá!%20Gostaria%20de%20fazer%20uma%20reserva%20para%20o%20casamento%20Econti%20Wedding%20no%20dia%2014/06%20às%2016h."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              Contatar hotel via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
