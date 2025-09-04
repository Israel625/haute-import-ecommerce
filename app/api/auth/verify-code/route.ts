import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json()
    
    // Verificar código
    const tempCodes = global.tempCodes || {}
    const savedCode = tempCodes[email]
    
    // console.log('Verificando:', { email, code, savedCode }) // Removido para produção
    
    if (!savedCode || savedCode.expires < Date.now()) {
      return NextResponse.json({ error: 'Código expirado' }, { status: 400 })
    }
    
    if (savedCode.code !== code) {
      console.log('Códigos não coincidem:', savedCode.code, 'vs', code)
      return NextResponse.json({ error: 'Código inválido' }, { status: 400 })
    }
    
    // Criar ou buscar cliente
    let cliente = await prisma.cliente.findUnique({ where: { email } })
    
    if (!cliente) {
      cliente = await prisma.cliente.create({
        data: { email }
      })
    }
    
    // Limpar código usado
    delete tempCodes[email]
    
    return NextResponse.json({ success: true, cliente })
  } catch (error) {
    console.log('Erro geral:', error)
    return NextResponse.json({ error: 'Erro ao verificar código' }, { status: 500 })
  }
}