"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HauteLogoIcon } from "@/components/haute-logo-icon"
import { AdminGuard } from "@/components/admin-guard"
import { Plus, Upload, Trash2, Edit, Eye, X } from "lucide-react"
import Image from "next/image"

export default function AdminPage() {
  const [produtos, setProdutos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarProdutos()
    carregarPedidos()
  }, [])

  const carregarProdutos = async () => {
    try {
      const response = await fetch('/api/produtos')
      const data = await response.json()
      setProdutos(data)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const carregarPedidos = async () => {
    try {
      const response = await fetch('/api/pedidos')
      const data = await response.json()
      setPedidos(data)
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    }
  }

  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    categoria: "",
    preco: "",
    precoOriginal: "",
    descricao: "",
    imagem: "",
    imagens: [] as string[],
    tamanhos: [] as string[]
  })

  const [editandoProduto, setEditandoProduto] = useState<any>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('produtos')
  const [pedidos, setPedidos] = useState<any[]>([])

  const adicionarProduto = async () => {
    if (novoProduto.nome && novoProduto.categoria && novoProduto.preco) {
      try {
        const response = await fetch('/api/produtos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...novoProduto,
            imagens: novoProduto.imagens || [],
            tamanhos: Array.isArray(novoProduto.tamanhos) 
              ? novoProduto.tamanhos 
              : (novoProduto.tamanhos || '').toString().split(',').map(t => t.trim()).filter(t => t)
          })
        })
        
        if (response.ok) {
          carregarProdutos()
          setNovoProduto({
            nome: "",
            categoria: "",
            preco: "",
            precoOriginal: "",
            descricao: "",
            imagem: "",
            imagens: [] as string[],
            tamanhos: [] as string[]
          })
        }
      } catch (error) {
        console.error('Erro ao adicionar produto:', error)
      }
    }
  }

  const editarProduto = (produto: any) => {
    setEditandoProduto(produto)
    setNovoProduto({
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco.toString(),
      precoOriginal: produto.precoOriginal.toString(),
      descricao: produto.descricao,
      imagem: produto.imagem,
      imagens: produto.imagens || [],
      tamanhos: produto.tamanhos || []
    })
  }

  const salvarEdicao = async () => {
    if (editandoProduto) {
      try {
        const response = await fetch(`/api/produtos/${editandoProduto.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...novoProduto,
            imagens: novoProduto.imagens || [],
            tamanhos: Array.isArray(novoProduto.tamanhos) 
              ? novoProduto.tamanhos 
              : (novoProduto.tamanhos || '').toString().split(',').map(t => t.trim()).filter(t => t)
          })
        })
        
        if (response.ok) {
          carregarProdutos()
          setEditandoProduto(null)
          setNovoProduto({
            nome: "",
            categoria: "",
            preco: "",
            precoOriginal: "",
            descricao: "",
            imagem: "",
            imagens: [] as string[],
            tamanhos: [] as string[]
          })
        }
      } catch (error) {
        console.error('Erro ao editar produto:', error)
      }
    }
  }

  const excluirProduto = async (id: number) => {
    try {
      const response = await fetch(`/api/produtos/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        carregarProdutos()
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImage(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        if (response.ok) {
          const data = await response.json()
          return data.url
        }
        return null
      })

      const urls = await Promise.all(uploadPromises)
      const validUrls = urls.filter(url => url !== null)
      
      setNovoProduto({
        ...novoProduto, 
        imagens: [...novoProduto.imagens, ...validUrls],
        imagem: novoProduto.imagens.length === 0 ? validUrls[0] : novoProduto.imagem
      })
    } catch (error) {
      console.error('Erro no upload:', error)
    } finally {
      setUploadingImage(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("adminAuth")
    window.location.href = "/admin/login"
  }

  return (
    <AdminGuard>
    <div className="min-h-screen bg-background">
      {/* Header Admin */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logohaute.png" alt="Haute Import" width={200} height={80} className="h-10 md:h-12 w-auto" />
            <div>
              <h1 className="font-heading text-2xl font-bold">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">Gerenciar produtos da Haute Import</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.open("/catalogo", "_blank")}>
              <Eye className="w-4 h-4 mr-2" />
              Ver Catálogo
            </Button>
            <Button variant="outline" onClick={logout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-4">
            <Button 
              variant={abaAtiva === 'produtos' ? 'default' : 'outline'}
              onClick={() => setAbaAtiva('produtos')}
            >
              Produtos ({produtos.length})
            </Button>
            <Button 
              variant={abaAtiva === 'pedidos' ? 'default' : 'outline'}
              onClick={() => setAbaAtiva('pedidos')}
            >
              Pedidos ({pedidos.length})
            </Button>
          </div>
        </div>
        {abaAtiva === 'produtos' ? (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário de Cadastro */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  {editandoProduto ? "Editar Produto" : "Novo Produto"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome do Produto</Label>
                  <Input
                    id="nome"
                    value={novoProduto.nome}
                    onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}
                    placeholder="Nome do produto"
                  />
                </div>

                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select value={novoProduto.categoria} onValueChange={(value) => setNovoProduto({...novoProduto, categoria: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tênis">Tênis</SelectItem>
                      <SelectItem value="Bolsas">Bolsas</SelectItem>
                      <SelectItem value="Acessórios">Acessórios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preco">Preço (R$)</Label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      value={novoProduto.preco}
                      onChange={(e) => setNovoProduto({...novoProduto, preco: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="precoOriginal">Preço Original (R$)</Label>
                    <Input
                      id="precoOriginal"
                      type="number"
                      step="0.01"
                      value={novoProduto.precoOriginal}
                      onChange={(e) => setNovoProduto({...novoProduto, precoOriginal: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={novoProduto.descricao}
                    onChange={(e) => setNovoProduto({...novoProduto, descricao: e.target.value})}
                    placeholder="Digite a descrição"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="tamanhos">Tamanhos Disponíveis</Label>
                  <Input
                    id="tamanhos"
                    value={typeof novoProduto.tamanhos === 'string' ? novoProduto.tamanhos : (novoProduto.tamanhos?.join(', ') || '')}
                    onChange={(e) => setNovoProduto({...novoProduto, tamanhos: e.target.value})}
                    placeholder="Ex: 35, 36, 37, 38, 39, 40"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Separe os tamanhos por vírgula</p>
                </div>

                <div>
                  <Label htmlFor="imagem">Imagens do Produto</Label>
                  <div className="space-y-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="w-8 h-8 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {uploadingImage ? 'Fazendo upload...' : 'Clique para selecionar imagens'}
                          </p>
                          <p className="text-xs text-gray-400">Múltiplas imagens permitidas</p>
                        </div>
                      </label>
                    </div>
                    {novoProduto.imagens && novoProduto.imagens.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {novoProduto.imagens && novoProduto.imagens.map((img, index) => (
                          <div key={index} className="relative">
                            <div className="w-full aspect-square bg-gray-100 rounded overflow-hidden">
                              <Image src={img} alt={`Preview ${index + 1}`} width={100} height={100} className="w-full h-full object-cover" />
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-red-500 text-white rounded-full"
                              onClick={() => {
                                const novasImagens = novoProduto.imagens.filter((_, i) => i !== index)
                                setNovoProduto({
                                  ...novoProduto, 
                                  imagens: novasImagens,
                                  imagem: novasImagens[0] || ""
                                })
                              }}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {editandoProduto ? (
                    <>
                      <Button onClick={salvarEdicao} className="flex-1">
                        Salvar Alterações
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setEditandoProduto(null)
                        setNovoProduto({
                          nome: "",
                          categoria: "",
                          preco: "",
                          precoOriginal: "",
                          descricao: "",
                          imagem: "",
                          imagens: [] as string[],
                          tamanhos: [] as string[]
                        })
                      }}>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button onClick={adicionarProduto} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Produto
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Produtos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Produtos Cadastrados ({produtos.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {produtos.map(produto => (
                    <div key={produto.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Upload className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{produto.nome}</h3>
                        <p className="text-sm text-muted-foreground">{produto.categoria}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-accent">R$ {produto.preco.toFixed(2)}</span>
                          {produto.precoOriginal > produto.preco && (
                            <span className="text-sm text-muted-foreground line-through">
                              R$ {produto.precoOriginal.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => editarProduto(produto)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => excluirProduto(produto.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {loading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Carregando produtos...
                    </div>
                  ) : produtos.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Nenhum produto cadastrado ainda
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Recebidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.isArray(pedidos) && pedidos.map(pedido => (
                  <div key={pedido.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{pedido.nomeCliente}</h3>
                        <p className="text-sm text-muted-foreground">{pedido.email}</p>
                        <p className="text-sm text-muted-foreground">{pedido.telefone}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">R$ {pedido.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(pedido.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium mb-1">Itens:</p>
                      {pedido.itens.map((item: any, index: number) => (
                        <p key={index} className="text-muted-foreground">
                          {item.quantidade}x {item.nome} - R$ {(item.preco * item.quantidade).toFixed(2)}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                {(!Array.isArray(pedidos) || pedidos.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum pedido recebido ainda
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        )}
      </div>
    </div>
    </AdminGuard>
  )
}