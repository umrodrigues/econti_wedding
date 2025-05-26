'use client'

import { useState, useEffect } from 'react'
import ReactQRCode from 'react-qr-code'
import styles from './Modal.module.scss'
import { QrCodePix } from 'qrcode-pix'
import { AiOutlineClose } from 'react-icons/ai'

type ModalProps = {
  gift: {
    id: number
    name: string
    total_price: string
  }
  quantity: number
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
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [pixPayload, setPixPayload] = useState<string | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [contributorName, setContributorName] = useState('')
  const [error, setError] = useState('')
  const [contributions, setContributions] = useState<Contribution[]>([])

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
        console.error('Erro ao carregar contribuições:', err)
      }
    }

    fetchContributions()
  }, [gift.id])

  const handleAmountChange = (value: string) => {
    setCustomAmount(value)
    const validFormat = /^[0-9]*[.,]?[0-9]{0,2}$/.test(value)
    if (!validFormat) {
      setError('Formato inválido. Use números e até 2 casas decimais.')
      return
    }
    const numericValue = parseCurrencyToNumber(value)
    if (numericValue > maxPrice) {
      setError('O valor não pode ser maior que o valor total do presente.')
    } else {
      setError('')
    }
  }

  const generatePixCode = async () => {
        // @ts-ignore

    const qrCodePix = new QrCodePix({
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
      setError('Por favor, informe seu nome.')
      return
    }

    if (totalPrice <= 0 || totalPrice > maxPrice) {
      setError('Informe um valor válido dentro do limite.')
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

        <p>{gift.name}</p>
        <h4>Valor total:</h4>
        <p>{gift.total_price}</p>

        {!paymentConfirmed && (
          <>
            <label htmlFor="contributorName" className={styles.label}>
              Seu nome
            </label>
            <input
              id="contributorName"
              type="text"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              placeholder="Digite seu nome"
              className={styles.input}
            />

            <label htmlFor="amount" className={styles.label}>
              Com quanto você gostaria de ajudar?
            </label>
            <input
              id="amount"
              type="text"
              value={customAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="Informe um valor"
              className={styles.input}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {totalPrice > 0 && !error && (
              <p>
                Total:{' '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalPrice)}
              </p>
            )}
          </>
        )}

        {paymentConfirmed && pixPayload ? (
          <div>
            <h4>Pagamento via Pix</h4>
            <ReactQRCode value={pixPayload} size={200} />
            <p>Escaneie o QR Code para realizar o pagamento.</p>
          </div>
        ) : (
          <div className={styles.modalButtons}>
            <button onClick={handlePayment} disabled={!totalPrice || !!error}>
              Ir para pagamento
            </button>
          </div>
        )}

        <div className={styles.contributors}>
          <h4>Pessoas que já contribuíram:</h4>
          <ul>
            {contributions.map((person, index) => (
              <li key={index}>
                {new Date(person.created_at).toLocaleDateString('pt-BR')} -{' '}
                {person.user_name} -{' '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(person.amount)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
