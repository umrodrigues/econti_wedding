export function formatCurrency(value: number | string): string {
  if (value === null || value === undefined) return 'R$ 0,00'
  
  let numValue: number
  
  if (typeof value === 'string') {
    numValue = parseCurrencyToNumber(value)
  } else {
    numValue = value
  }
  
  if (isNaN(numValue) || numValue < 0) return 'R$ 0,00'
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numValue)
}

export function parseCurrencyToNumber(value: string): number {
  if (!value || typeof value !== 'string') return 0
  
  let cleaned = value.replace(/[^\d,.-]/g, '')
  
  if (cleaned.includes(',')) {
    const parts = cleaned.split(',')
    if (parts.length === 2 && parts[1].length <= 2) {
      cleaned = parts[0] + '.' + parts[1]
    } else if (parts.length === 2 && parts[1].length > 2) {
      cleaned = parts.join('')
    } else {
      cleaned = cleaned.replace(/,/g, '')
    }
  }
  
  const parsed = parseFloat(cleaned)
  
  if (isNaN(parsed) || parsed < 0) return 0
  return Math.round(parsed * 100) / 100
}

export function applyCurrencyMask(value: string): string {
  let cleaned = value.replace(/\D/g, '')
  
  if (cleaned === '') return ''
  
  const number = parseInt(cleaned, 10) / 100
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(number)
}
