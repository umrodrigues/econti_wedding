'use client'

import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.title}>Econti Wedding 💍</h2>
        <Link href="/confirmation-presence" className={styles.button}>
          Confirmação de presença
        </Link>
      </div>
    </header>
  )
}
