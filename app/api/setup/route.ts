import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST() {
  return await setupDatabase()
}

export async function GET() {
  return await setupDatabase()
}

async function setupDatabase() {
  try {
    console.log('🔄 Executando migrações...')
    
    // Executar migrações do Prisma
    const { execSync } = require('child_process')
    try {
      execSync('npx prisma db push --force-reset', { stdio: 'inherit' })
    } catch (migrationError) {
      console.log('Tentando migração alternativa...')
      execSync('npx prisma migrate deploy', { stdio: 'inherit' })
    }
    
    console.log('✅ Migrações concluídas!')
    
    // Criar admin padrão
    const usuario = 'haute'
    const senha = '136572Ik#'
    const nome = 'Haute Admin'
    
    const senhaHash = await bcrypt.hash(senha, 10)
    
    const admin = await prisma.admin.upsert({
      where: { usuario },
      update: { senha: senhaHash, nome },
      create: { usuario, senha: senhaHash, nome }
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Setup concluído!',
      admin: { usuario, nome }
    })
    
  } catch (error) {
    console.error('Erro no setup:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}