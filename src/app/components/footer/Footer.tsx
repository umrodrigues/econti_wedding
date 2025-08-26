import React from 'react';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Desenvolvido por{' '}
        <a href="https://www.lunaristech.com.br" target="_blank" rel="noopener noreferrer">
          Lunaris Tech
        </a>
      </p>
    </footer>
  );
}
