import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Rate limiting simples
const attempts = new Map()

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    
    // Rate limiting: máximo 5 tentativas por minuto
    const userAttempts = attempts.get(ip) || []
    const recentAttempts = userAttempts.filter(time => now - time < 60000)
    
    if (recentAttempts.length >= 5) {
      return NextResponse.json({ error: 'Muitas tentativas. Tente novamente em 1 minuto.' }, { status: 429 })
    }
    
    const { usuario, senha } = await request.json()
    
    // Validações
    if (!usuario || !senha) {
      return NextResponse.json({ error: 'Usuário e senha são obrigatórios' }, { status: 400 })
    }
    
    if (usuario.length < 3 || senha.length < 6) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
    }
    
    const admin = await prisma.admin.findUnique({
      where: { usuario }
    })
    
    // Registrar tentativa
    attempts.set(ip, [...recentAttempts, now])
    
    if (admin && await bcrypt.compare(senha, admin.senha)) {
      // Limpar tentativas em caso de sucesso
      attempts.delete(ip)
      return NextResponse.json({ success: true, admin: { id: admin.id, usuario: admin.usuario, nome: admin.nome } })
    } else {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
    }
  } catch (error) {
    console.error('Erro na API auth:', error)
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}