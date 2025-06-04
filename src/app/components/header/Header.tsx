'use client'

import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.title}>Econti Wedding 💍</h2>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfh3tQ3YFg6BTUrEIY0opCGBc2Qu-TYEAFYEaVYUHECYv2Dfw/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Confirmação de presença
        </a>
      </div>
    </header>
  )
}
