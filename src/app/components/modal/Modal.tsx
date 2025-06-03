'use client'

import { useState, useEffect } from 'react'
import ReactQRCode from 'react-qr-code'
import { AiOutlineClose } from 'react-icons/ai'
import styles from './Modal.module.scss'
import { QrCodePix } from 'qrcode-pix'
import Image from 'next/image'

type ModalProps = {
  gift: {
    id: number
    name: string
    total_price: string
    image?: string
  }
  closeModal: () => void
}

type Contribution = {
  user_name: string
  amount: number
  created_at: string
}

function parseCurrencyToNumber(value: string): number {
  const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.')
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

export default function Modal({ gift, closeModal }: ModalProps) {
  const [contributorName, setContributorName] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [error, setError] = useState('')
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [loading, setLoading] = useState(true)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [pixPayload, setPixPayload] = useState<string | null>(null)

  const maxPrice = parseCurrencyToNumber(gift.total_price)
  const totalPrice = parseCurrencyToNumber(customAmount)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch(`/api/contributions/${gift.id}`)
        const data = await res.json()
        if (res.ok) {
          setContributions(data.contributions)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchContributions()
  }, [gift.id])

  const handleAmountChange = (value: string) => {
    setCustomAmount(value)
    const valid = /^[0-9]*[.,]?[0-9]{0,2}$/.test(value)
    if (!valid) {
      setError('Formato inválido')
      return
    }
    const parsed = parseCurrencyToNumber(value)
    if (parsed > maxPrice) {
      setError('Valor maior que o total')
    } else {
      setError('')
    }
  }

  //@ts-ignore
  const generatePixCode = async () => {
    const qrCodePix = QrCodePix({
      version: '01',
      key: '04182410076',
      name: 'ECONTIEVENTOS',
      city: 'SAO PAULO',
      transactionId: 'ECONTI123',
      message: `Presente: ${gift.name}${contributorName ? ` - ${contributorName}` : ''}`,
      value: totalPrice,
    })

    return qrCodePix.payload()
  }

  const handlePayment = async () => {
    if (!contributorName.trim()) {
      setError('Informe seu nome')
      return
    }
    if (totalPrice <= 0 || totalPrice > maxPrice) {
      setError('Informe um valor válido')
      return
    }
    const payload = await generatePixCode()
    setPixPayload(payload)
    setPaymentConfirmed(true)
  }

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          <AiOutlineClose />
        </button>

        {gift.image?.trim() && (
          <Image
            src={gift.image}
            alt={gift.name}
            width={300}
            height={300}
            className={styles.image}
          />
        )}

        <h2 className={styles.giftTitle}>{gift.name}</h2>
        <p className={styles.total}>Total: {gift.total_price}</p>

        {!paymentConfirmed ? (
          <>
            <input
              type="text"
              placeholder="Seu nome"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Valor que quer contribuir"
              value={customAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className={styles.input}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button onClick={handlePayment} disabled={!totalPrice || !!error} className={styles.payButton}>
              Ir para o pagamento
            </button>
          </>
        ) : (
          <div className={styles.qrSection}>
            <ReactQRCode value={pixPayload!} size={200} />
            <p>Escaneie o QR Code para pagar</p>
          </div>
        )}

        <div className={styles.contributors}>
          <h3>Contribuições:</h3>
          {loading ? (
            <p>Carregando...</p>
          ) : contributions.length === 0 ? (
            <p>Nenhuma contribuição ainda.</p>
          ) : (
            <ul>
              {contributions.map((c, i) => (
                <li key={i}>
                  {new Date(c.created_at).toLocaleDateString('pt-BR')} - {c.user_name} - {c.amount}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
