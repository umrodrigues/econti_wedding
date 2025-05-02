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
    price: string
  }
  quantity: number
  closeModal: () => void
}

export default function Modal({ gift, quantity, closeModal }: ModalProps) {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [pixPayload, setPixPayload] = useState<string | null>(null)

  const totalPrice = quantity * parseFloat(gift.price.replace('R$', '').replace(',', '.'))

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

    const payload = qrCodePix.payload()
    return payload
  }

  const handlePayment = async () => {
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
        <h3>Você escolheu:</h3>
        <p>{quantity}x {gift.name}</p>
        <p>
          Total:{' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(totalPrice)}
        </p>

        {paymentConfirmed && pixPayload ? (
          <div>
            <h4>Pagamento via Pix</h4>
            <ReactQRCode value={pixPayload} size={200} />
            <p>Escaneie o QR Code para realizar o pagamento.</p>
          </div>
        ) : (
          <div className={styles.modalButtons}>
            <button onClick={handlePayment}>Ir para pagamento</button>
          </div>
        )}
      </div>
    </div>
  )
}
