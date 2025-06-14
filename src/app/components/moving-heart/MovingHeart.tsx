'use client'
import React, { useEffect, useState } from 'react'
import styles from './MovingHeart.module.scss'

export default function MovingHeart() {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [velocity, setVelocity] = useState({ vx: 2.5, vy: 2 })

  const heartSize = 120
  const margin = 40

  useEffect(() => {
    const updatePosition = () => {
      const { innerWidth, innerHeight } = window

      setPos(({ x, y }) => {
        let newX = x + velocity.vx
        let newY = y + velocity.vy

        if (newX < margin) {
          newX = margin
          setVelocity(v => ({ ...v, vx: Math.abs(v.vx) }))
        } else if (newX + heartSize > innerWidth - margin) {
          newX = innerWidth - heartSize - margin
          setVelocity(v => ({ ...v, vx: -Math.abs(v.vx) }))
        }

        if (newY < margin) {
          newY = margin
          setVelocity(v => ({ ...v, vy: Math.abs(v.vy) }))
        } else if (newY + heartSize > innerHeight - margin) {
          newY = innerHeight - heartSize - margin
          setVelocity(v => ({ ...v, vy: -Math.abs(v.vy) }))
        }

        return { x: newX, y: newY }
      })
    }

    const interval = setInterval(updatePosition, 20)
    return () => clearInterval(interval)
  }, [velocity])

  return (
    <svg
      className={styles.heart}
      style={{ top: pos.y, left: pos.x }}
      viewBox="0 0 32 29.6"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Coração animado com foto"
      role="img"
      width={heartSize}
      height={heartSize}
    >
      <defs>
        <clipPath id="heartClip">
          <path d="M23.6 0c-2.7 0-5 1.7-6 4.1C16.4 1.7 14.1 0 11.4 0 5.7 0 1.3 4.6 1.3 10.3c0 7.1 10.7 14.5 14 19.3 3.3-4.8 14-12.2 14-19.3C29.3 4.6 24.9 0 23.6 0z" />
        </clipPath>
      </defs>
      <image
        href="/casal.jpg"
        x="0"
        y="0"
        width="32"
        height="29.6"
        clipPath="url(#heartClip)"
        preserveAspectRatio="xMidYMid slice"
        className={styles.heartImage}
      />
      <path
        className={styles.heartStroke}
        d="M23.6 0c-2.7 0-5 1.7-6 4.1C16.4 1.7 14.1 0 11.4 0 5.7 0 1.3 4.6 1.3 10.3c0 7.1 10.7 14.5 14 19.3 3.3-4.8 14-12.2 14-19.3C29.3 4.6 24.9 0 23.6 0z"
        fill="none"
        stroke="#ff4d6d"
        strokeWidth="1.8"
      />
    </svg>
  )
}
