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
    console.log('🔄 Criando tabelas...')
    
    // Criar tabelas manualmente
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "admins" (
        "id" SERIAL PRIMARY KEY,
        "usuario" TEXT UNIQUE NOT NULL,
        "senha" TEXT NOT NULL,
        "nome" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "produtos" (
        "id" SERIAL PRIMARY KEY,
        "nome" TEXT NOT NULL,
        "descricao" TEXT,
        "preco" DOUBLE PRECISION NOT NULL,
        "precoOriginal" DOUBLE PRECISION NOT NULL,
        "categoria" TEXT NOT NULL,
        "imagem" TEXT NOT NULL,
        "imagens" TEXT[],
        "tamanhos" TEXT[],
        "rating" DOUBLE PRECISION DEFAULT 4.5,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "pedidos" (
        "id" SERIAL PRIMARY KEY,
        "nomeCliente" TEXT NOT NULL,
        "email" TEXT,
        "telefone" TEXT,
        "total" DOUBLE PRECISION NOT NULL,
        "itens" JSONB NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'pendente',
        "clienteId" INTEGER,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "clientes" (
        "id" SERIAL PRIMARY KEY,
        "email" TEXT UNIQUE NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    console.log('✅ Tabelas criadas!')
    
    // Criar admin padrão
    const usuario = 'haute'
    const senha = '136572Ik#'
    const nome = 'Haute Admin'
    
    const senhaHash = await bcrypt.hash(senha, 10)
    
    // Verificar se admin já existe
    const adminExistente = await prisma.$queryRaw`SELECT * FROM "admins" WHERE "usuario" = ${usuario} LIMIT 1`
    
    if (Array.isArray(adminExistente) && adminExistente.length === 0) {
      // Criar admin
      await prisma.$executeRaw`
        INSERT INTO "admins" ("usuario", "senha", "nome") 
        VALUES (${usuario}, ${senhaHash}, ${nome})
      `
    }
    
    const admin = await prisma.$queryRaw`SELECT * FROM "admins" WHERE "usuario" = ${usuario} LIMIT 1`
    const adminData = Array.isArray(admin) ? admin[0] : admin
    
    return NextResponse.json({ 
      success: true, 
      message: 'Setup concluído!',
      admin: { usuario: adminData.usuario, nome: adminData.nome }
    })

    
  } catch (error) {
    console.error('Erro no setup:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}