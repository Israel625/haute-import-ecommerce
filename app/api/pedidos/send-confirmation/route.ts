import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { pedido } = await request.json()
    
    if (!pedido.email) {
      return NextResponse.json({ success: true })
    }
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
    
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; background: #f8f9fa; padding: 20px; border-radius: 8px; }
          .pedido-info { background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { border-bottom: 1px solid #eee; padding: 10px 0; }
          .total { font-size: 18px; font-weight: bold; color: #007bff; text-align: right; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>✅ Pedido Confirmado!</h1>
          <p>Haute Import - Produtos Exclusivos</p>
        </div>
        
        <p>Olá <strong>${pedido.nomeCliente}</strong>!</p>
        <p>Seu pedido foi recebido com sucesso.</p>
        
        <div class="pedido-info">
          <h3>📋 Pedido #${pedido.id}</h3>
          <p><strong>Status:</strong> ${pedido.status}</p>
          
          <h4>🛍️ Itens:</h4>
          ${pedido.itens.map(item => `
            <div class="item">
              <strong>${item.nome}</strong>
              ${item.tamanhoSelecionado ? `<br><small>Tamanho: ${item.tamanhoSelecionado}</small>` : ''}
              <br>Quantidade: ${item.quantidade} x R$ ${item.preco.toFixed(2)}
            </div>
          `).join('')}
          
          <div class="total">
            Total: R$ ${pedido.total.toFixed(2)}
          </div>
        </div>
        
        <p>📞 Nossa equipe entrará em contato via WhatsApp em breve.</p>
        <p>🚚 <strong>FRETE GRÁTIS</strong> para todo o Brasil</p>
        
        <p>© 2024 Haute Import</p>
      </body>
      </html>
    `
    
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"Haute Import" <${process.env.EMAIL_USER}>`,
        to: pedido.email,
        subject: `✅ Pedido #${pedido.id} confirmado - Haute Import`,
        html: htmlTemplate
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao enviar confirmação:', error)
    return NextResponse.json({ error: 'Erro ao enviar confirmação' }, { status: 500 })
  }
}