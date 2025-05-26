'use client'

import { useState } from 'react'
import ReactQRCode from 'react-qr-code'
import styles from './Modal.module.scss'

// @ts-ignore
import { QrCodePix } from 'qrcode-pix'
import { AiOutlineClose } from 'react-icons/ai'

type ModalProps = {
  gift: {
    name: string
    total_price: string
  }
  quantity: number
  closeModal: () => void
}

function parseCurrencyToNumber(value: string): number {
  // Remove tudo que não seja dígito, vírgula ou ponto
  const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.')
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

export default function Modal({ gift, quantity, closeModal }: ModalProps) {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [pixPayload, setPixPayload] = useState<string | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [error, setError] = useState('')

  const contributors = [
    { name: 'Maria', amount: 50 },
    { name: 'João', amount: 100 },
    { name: 'Ana', amount: 75 },
  ]

  const maxPrice = parseCurrencyToNumber(gift.total_price)

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

  const totalPrice = parseCurrencyToNumber(customAmount)

  const generatePixCode = async () => {
    // @ts-ignore
    const qrCodePix = new QrCodePix({
      version: '01',
      key: '04182410076',
      name: 'ECONTIEVENTOS',
      city: 'SAO PAULO',
      transactionId: 'ECONTI123',
      message: `Presente: ${gift.name}`,
      value: totalPrice,
    })

    return qrCodePix.payload()
  }

  const handlePayment = async () => {
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
                  currency: 'BRL'
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
            <button
              onClick={handlePayment}
              disabled={!totalPrice || !!error}
            >
              Ir para pagamento
            </button>
          </div>
        )}

        <div className={styles.contributors}>
          <h4>Pessoas que já contribuíram:</h4>
          <ul>
            {contributors.map((person, index) => (
              <li key={index}>
                {person.name} -{' '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(person.amount)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
