import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    const pedidos = await prisma.pedido.findMany({
      where: { clienteId: parseInt(id) },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(pedidos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar pedidos' }, { status: 500 })
  }
}