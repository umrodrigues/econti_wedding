'use client'

import { useState, useEffect } from 'react'
import ReactQRCode from 'react-qr-code'
import { AiOutlineClose, AiOutlineCopy } from 'react-icons/ai'
import styles from './Modal.module.scss'
import Image from 'next/image'
import { createStaticPix } from 'pix-utils'

type ModalProps = {
  gift: {
    id: number
    name: string
    total_price: string
    remaining_price: string
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

function cleanText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').slice(0, 40)
}

export default function Modal({ gift, closeModal }: ModalProps) {
  const [contributorName, setContributorName] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [error, setError] = useState('')
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [loading, setLoading] = useState(true)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [pixPayload, setPixPayload] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState('')

  const maxPrice = parseCurrencyToNumber(gift.total_price)
  const remainingPrice = parseCurrencyToNumber(gift.remaining_price)
  const totalPrice = parseCurrencyToNumber(customAmount)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch(`/api/contributions/${gift.id}`)
        const data = await res.json()
        if (res.ok) {
          setContributions(data.contributions)
        }
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
    if (parsed > remainingPrice) {
      setError('Valor maior que o restante')
    } else {
      setError('')
    }
  }

  const generatePixCode = async () => {
    const amount = Math.min(Math.max(0.01, parseFloat(totalPrice.toFixed(2))), remainingPrice)
    const txid = 'EcontiWedding'
    let info = `Presente: ${gift.name}${contributorName ? ` - ${contributorName}` : ''}`
    info = cleanText(info)

    const pix = createStaticPix({
      pixKey: 'fazopixprocasamento@gmail.com',
      merchantName: 'ECONTICOMIGO',
      merchantCity: 'SAO PAULO',
      txid,
      transactionAmount: amount,
      infoAdicional: info,
    })

    if ('message' in pix) {
      throw new Error(pix.message)
    }

    return pix.toBRCode()
  }

  const handlePayment = async () => {
    if (remainingPrice <= 0) {
      setError('Este presente já foi totalmente pago.')
      return
    }
    if (!contributorName.trim()) {
      setError('Informe seu nome')
      return
    }
    if (totalPrice <= 0 || totalPrice > remainingPrice) {
      setError('Informe um valor válido')
      return
    }
    try {
      const payload = await generatePixCode()
      setPixPayload(payload)
      setPaymentConfirmed(true)
      setError('')
    } catch {
      setError('Erro ao gerar código Pix')
    }
  }

  const handleCopyPixCode = () => {
    if (pixPayload) {
      navigator.clipboard.writeText(pixPayload)
        .then(() => {
          setCopySuccess('Código copiado!')
          setTimeout(() => setCopySuccess(''), 2000)
        })
        .catch(() => setCopySuccess('Falha ao copiar'))
    }
  }

  const handlePaymentClick = async () => {
    try {
      const res = await fetch(`/api/contributions/${gift.id}/insert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name: contributorName, amount: totalPrice }),
      })
      if (res.ok) {
        setContributions(prev => [...prev, { user_name: contributorName, amount: totalPrice, created_at: new Date().toISOString() }])
        setContributorName('')
        setCustomAmount('')
        setError('')
        setPaymentConfirmed(false)
        setPixPayload(null)
      }
    } catch {}
  }

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
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
        <p className={styles.total}>Restante: {gift.remaining_price}</p>

        {!paymentConfirmed ? (
          <>
            <input
              type="text"
              placeholder="Seu nome"
              value={contributorName}
              onChange={e => setContributorName(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Valor que quer contribuir"
              value={customAmount}
              onChange={e => handleAmountChange(e.target.value)}
              className={styles.input}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button
              onClick={handlePayment}
              disabled={!totalPrice || !!error || remainingPrice <= 0}
              className={styles.payButton}
            >
              Ir para o pagamento
            </button>
          </>
        ) : (
          <>
            <div className={styles.qrSection}>
              <ReactQRCode value={pixPayload!} size={200} />
              <p>Escaneie o QR Code para pagar</p>
            </div>

            <div className={styles.copySection}>
              <label htmlFor="pixCode" className={styles.label}>Código Pix (copia e cola):</label>
              <textarea
                id="pixCode"
                readOnly
                value={pixPayload || ''}
                className={styles.textarea}
                rows={3}
              />
              <button onClick={handleCopyPixCode} className={styles.copyButton} aria-label="Copiar código Pix">
                <AiOutlineCopy /> Copiar código
              </button>
              {copySuccess && <p className={styles.copySuccess}>{copySuccess}</p>}
            </div>

            <button onClick={handlePaymentClick} className={styles.confirmButton}>
              Já realizou o pagamento? Clique aqui.
            </button>
          </>
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
