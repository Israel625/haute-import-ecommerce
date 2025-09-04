import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(produtos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validações
    if (!data.nome || data.nome.trim().length < 3) {
      return NextResponse.json({ error: 'Nome deve ter pelo menos 3 caracteres' }, { status: 400 })
    }
    
    if (!data.categoria || !['Tênis', 'Bolsas', 'Acessórios'].includes(data.categoria)) {
      return NextResponse.json({ error: 'Categoria inválida' }, { status: 400 })
    }
    
    const preco = parseFloat(data.preco)
    const precoOriginal = parseFloat(data.precoOriginal)
    
    if (isNaN(preco) || preco <= 0) {
      return NextResponse.json({ error: 'Preço deve ser maior que zero' }, { status: 400 })
    }
    
    if (isNaN(precoOriginal) || precoOriginal < preco) {
      return NextResponse.json({ error: 'Preço original deve ser maior ou igual ao preço' }, { status: 400 })
    }
    
    const produto = await prisma.produto.create({
      data: {
        nome: data.nome.trim(),
        categoria: data.categoria,
        preco,
        precoOriginal,
        descricao: data.descricao?.trim() || '',
        imagem: data.imagens?.[0] || data.imagem || '/placeholder.jpg',
        imagens: data.imagens || [],
        tamanhos: data.tamanhos || []
      }
    })
    return NextResponse.json(produto)
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 })
  }
}