import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()
    const produto = await prisma.produto.update({
      where: { id: parseInt(id) },
      data: {
        nome: data.nome,
        categoria: data.categoria,
        preco: parseFloat(data.preco),
        precoOriginal: parseFloat(data.precoOriginal),
        descricao: data.descricao,
        imagem: data.imagens?.[0] || data.imagem,
        imagens: data.imagens || [],
        tamanhos: data.tamanhos || []
      }
    })
    return NextResponse.json(produto)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.produto.delete({
      where: { id: parseInt(id) }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 })
  }
}