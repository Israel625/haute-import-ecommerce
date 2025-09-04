const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function setupProduction() {
  try {
    console.log('🔄 Executando migrações...')
    
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
    
    console.log('✅ Setup concluído!')
    console.log(`👤 Admin: ${usuario}`)
    console.log(`🔑 Senha: ${senha}`)
    
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupProduction()