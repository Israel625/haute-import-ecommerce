import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { nomeCliente, email, telefone, carrinho, total, clienteId } = await request.json()
    
    // Validações
    if (!nomeCliente || nomeCliente.trim().length < 3) {
      return NextResponse.json({ error: 'Nome deve ter pelo menos 3 caracteres' }, { status: 400 })
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }
    
    if (!carrinho || !Array.isArray(carrinho) || carrinho.length === 0) {
      return NextResponse.json({ error: 'Carrinho não pode estar vazio' }, { status: 400 })
    }
    
    if (!total || total <= 0) {
      return NextResponse.json({ error: 'Total inválido' }, { status: 400 })
    }
    
    // Validar itens do carrinho
    for (const item of carrinho) {
      if (!item.id || !item.nome || !item.preco || !item.quantidade) {
        return NextResponse.json({ error: 'Itens do carrinho inválidos' }, { status: 400 })
      }
    }
    
    const pedido = await prisma.pedido.create({
      data: {
        nomeCliente: nomeCliente.trim(),
        email: email?.trim() || null,
        telefone: telefone?.trim() || null,
        total,
        itens: carrinho,
        status: 'pendente',
        clienteId: clienteId || null
      }
    })
    
    return NextResponse.json({ success: true, pedido })
  } catch (error) {
    console.error('Erro ao criar pedido:', error)
    return NextResponse.json({ error: 'Erro ao criar pedido' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const pedidos = await prisma.pedido.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(pedidos)
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
    return NextResponse.json({ error: 'Erro ao buscar pedidos: ' + error.message }, { status: 500 })
  }
}