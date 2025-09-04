import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    // Gerar código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Configurar transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
    
    // Template do email
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .code { background: #f8f9fa; border: 2px dashed #007bff; padding: 20px; text-align: center; margin: 20px 0; }
          .code-number { font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 4px; }
          .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="color: #333;">🔐 Código de Verificação</h1>
          <p>Haute Import - Produtos Exclusivos</p>
        </div>
        
        <p>Olá!</p>
        <p>Use o código abaixo para acessar sua conta na Haute Import:</p>
        
        <div class="code">
          <div class="code-number">${code}</div>
          <p style="margin: 10px 0 0 0; color: #666;">Este código expira em 10 minutos</p>
        </div>
        
        <p>Se você não solicitou este código, pode ignorar este email.</p>
        
        <div class="footer">
          <p>© 2024 Haute Import - Produtos Exclusivos Importados</p>
          <p>Este é um email automático, não responda.</p>
        </div>
      </body>
      </html>
    `
    
    // Enviar email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"Haute Import" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🔐 Seu código de verificação - Haute Import',
        html: htmlTemplate
      })
    } else {
      // Fallback para desenvolvimento
      console.log(`Código para ${email}: ${code}`)
    }
    
    // Salvar código temporariamente
    global.tempCodes = global.tempCodes || {}
    global.tempCodes[email] = { code, expires: Date.now() + 10 * 60 * 1000 }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json({ error: 'Erro ao enviar código' }, { status: 500 })
  }
}