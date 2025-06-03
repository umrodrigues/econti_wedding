import { useState } from 'react'
import styles from './ConfirmationPresenceContent.module.scss'

export default function ConfirmationPresenceContent() {
  const [formData, setFormData] = useState({
    nome: '',
    adultos: 0,
    criancas: 0,
    chinelo: false,
    numeroChinelo: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement
    const { name, value, type } = target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Obrigado pela confirmação, ${formData.nome}!`)
    // Aqui você poderia enviar os dados para o backend
  }

  return (
    <main className={styles.container}>
      <h1>Confirmação de Presença</h1>
      <p>Estamos felizes com sua presença! Por favor, preencha o formulário abaixo.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome completo:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Seu nome completo"
          />
        </label>

        <label>
          Quantos adultos irão comparecer?
          <select
            name="adultos"
            value={formData.adultos}
            onChange={handleChange}
            required
          >
            {[0,1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        <label>
          Quantas crianças irão comparecer?
          <select
            name="criancas"
            value={formData.criancas}
            onChange={handleChange}
            required
          >
            {[0,1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="chinelo"
            checked={formData.chinelo}
            onChange={handleChange}
          />
          Gostaria de pedir chinelo para mulheres?
        </label>

        {formData.chinelo && (
          <label>
            Número do chinelo:
            <select
              name="numeroChinelo"
              value={formData.numeroChinelo}
              onChange={handleChange}
              required={formData.chinelo}
            >
              <option value="">Selecione</option>
              {[34,35,36,37,38,39,40,41].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>
        )}

        <button type="submit" className={styles.submitButton}>
          Confirmar Presença
        </button>
      </form>
    </main>
  )
}
