'use client'
import styles from './Header.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>Econti Wedding</Link>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/cart">Carrinho</Link>
      </nav>
    </header>
  )
}
