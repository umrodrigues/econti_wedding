'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const cabanaImages = [
  '/cabana.jpg',
  '/cabana2.jpg',
  '/cabana3.jpg',
  '/cabana4.jpg',
  '/cabana5.jpg',
]

export default function Header() {
  const [showModal, setShowModal] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % cabanaImages.length)

  const prevImageFunc = () =>
    setCurrentImage((prev) =>
      prev === 0 ? cabanaImages.length - 1 : prev - 1
    )

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.title}>& Conti Wedding 💍</h2>
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
            <div className={styles.carousel}>
              <button className={styles.navButton} onClick={prevImageFunc}>
                <FaChevronLeft />
              </button>

              <div className={styles.sliderWrapper}>
                <div
                  className={styles.slider}
                  style={{
                    transform: `translateX(-${currentImage * 100}%)`,
                  }}
                >
                  {cabanaImages.map((src, index) => (
                    <div key={index} className={styles.imageContainer}>
                      <Image
                        src={src}
                        alt={`Cabana ${index + 1}`}
                        fill
                        className={styles.cabanaImage}
                        priority
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button className={styles.navButton} onClick={nextImage}>
                <FaChevronRight />
              </button>
            </div>

            <p>
              O casamento acontecerá no dia <strong>14/06 às 16h</strong>. Para
              facilitar sua hospedagem, sugerimos reservar com o hotel parceiro.
            </p>
            <p>
              Entre em contato com o hotel informando que participará do
              casamento Econti Wedding para obter condições especiais.
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
