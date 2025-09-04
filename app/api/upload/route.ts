import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    // Por enquanto, retornar URL de placeholder
    // Em produção, usar Cloudinary ou AWS S3
    const timestamp = Date.now()
    const filename = `produto_${timestamp}.jpg`
    
    return NextResponse.json({ 
      url: `/placeholder.jpg`, // Placeholder temporário
      filename: filename 
    })
  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json({ error: 'Erro no upload' }, { status: 500 })
  }
}