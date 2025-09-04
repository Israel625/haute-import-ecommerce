const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const usuario = 'haute'  // ← MUDE AQUI
    const senha = '136572Ik#'  // ← MUDE AQUI
    const nome = 'Haute Admin'  // ← MUDE AQUI
    
    const senhaHash = await bcrypt.hash(senha, 10)
    
    const admin = await prisma.admin.upsert({
      where: { usuario },
      update: { senha: senhaHash, nome },
      create: { usuario, senha: senhaHash, nome }
    })
    
    console.log('✅ Admin criado!')
    console.log(`👤 Usuário: ${usuario}`)
    console.log(`🔑 Senha: ${senha}`)
    
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()