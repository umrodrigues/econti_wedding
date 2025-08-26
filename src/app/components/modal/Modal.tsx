'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <AnimatePresence>
      <motion.div 
        className={styles.modalOverlay} 
        onClick={closeModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className={styles.modal} 
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.button 
            className={styles.closeButton} 
            onClick={closeModal}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AiOutlineClose />
          </motion.button>

          {gift.image?.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Image
                src={gift.image}
                alt={gift.name}
                width={300}
                height={300}
                className={styles.image}
              />
            </motion.div>
          )}

          <motion.h2 
            className={styles.giftTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {gift.name}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className={styles.total}>Total: {gift.total_price}</p>
            <p className={styles.total}>Restante: {gift.remaining_price}</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!paymentConfirmed ? (
              <motion.div
                key="payment-form"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4 }}
              >
                <motion.input
                  type="text"
                  placeholder="Seu nome"
                  value={contributorName}
                  onChange={e => setContributorName(e.target.value)}
                  className={styles.input}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
                <motion.input
                  type="text"
                  placeholder="Valor que quer contribuir"
                  value={customAmount}
                  onChange={e => handleAmountChange(e.target.value)}
                  className={styles.input}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />
                <AnimatePresence>
                  {error && (
                    <motion.p 
                      className={styles.error}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
                <motion.button
                  onClick={handlePayment}
                  disabled={!totalPrice || !!error || remainingPrice <= 0}
                  className={styles.payButton}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ir para o pagamento
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="payment-confirmed"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div 
                  className={styles.qrSection}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <ReactQRCode value={pixPayload!} size={200} />
                  <p>Escaneie o QR Code para pagar</p>
                </motion.div>

                <motion.div 
                  className={styles.copySection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label htmlFor="pixCode" className={styles.label}>Código Pix (copia e cola):</label>
                  <textarea
                    id="pixCode"
                    readOnly
                    value={pixPayload || ''}
                    className={styles.textarea}
                    rows={3}
                  />
                  <motion.button 
                    onClick={handleCopyPixCode} 
                    className={styles.copyButton} 
                    aria-label="Copiar código Pix"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AiOutlineCopy /> Copiar código
                  </motion.button>
                  <AnimatePresence>
                    {copySuccess && (
                      <motion.p 
                        className={styles.copySuccess}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        {copySuccess}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.button 
                  onClick={handlePaymentClick} 
                  className={styles.confirmButton}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Já realizou o pagamento? Clique aqui.
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            className={styles.contributors}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h3>Contribuições:</h3>
            {loading ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                Carregando...
              </motion.p>
            ) : contributions.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                Nenhuma contribuição ainda.
              </motion.p>
            ) : (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                {contributions.map((c, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    {new Date(c.created_at).toLocaleDateString('pt-BR')} - {c.user_name} - {c.amount}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
