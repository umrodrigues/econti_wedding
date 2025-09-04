import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  const { contributorName, productName, amount } = req.body

  if (!contributorName || !productName || !amount) {
    return res.status(400).json({ message: 'Dados obrigatórios não fornecidos' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'fazopixprocasamento@gmail.com',
      subject: `💍 Nova Contribuição - Econti Wedding`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8;">
          <div style="background: linear-gradient(135deg, #1c3b6c, #486b92); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 28px; font-family: 'Dancing Script', cursive;">💍 Econti Wedding</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Nova Contribuição Recebida!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <h2 style="color: #1c3b6c; margin-top: 0; font-size: 24px;">Detalhes da Contribuição</h2>
            
            <div style="background: #f0f6ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>👤 Contribuidor:</strong> ${contributorName}</p>
              <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>🎁 Produto:</strong> ${productName}</p>
              <p style="margin: 0; font-size: 18px; color: #e91e63;"><strong>💰 Valor:</strong> R$ ${amount}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6d4c41; font-size: 14px; margin: 0;">
                Esta contribuição foi registrada automaticamente no sistema.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6d4c41; font-size: 12px;">
            <p>Econti Wedding - Sistema de Lista de Presentes</p>
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ message: 'Email enviado com sucesso' })
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    res.status(500).json({ message: 'Erro ao enviar email' })
  }
}
