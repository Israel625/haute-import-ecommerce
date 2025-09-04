"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HauteLogoIcon } from "@/components/haute-logo-icon"
import { ShoppingCart, Filter, Star, Plus, Minus, X, ChevronLeft, ChevronRight, User } from "lucide-react"
import Image from "next/image"

const categorias = ["Todos", "Tênis", "Bolsas", "Acessórios"]

function SearchParamsHandler({ setCategoriaAtiva }: { setCategoriaAtiva: (categoria: string) => void }) {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const categoria = searchParams.get('categoria')
    if (categoria && categorias.includes(categoria)) {
      setCategoriaAtiva(categoria)
    }
  }, [searchParams, setCategoriaAtiva])
  
  return null
}

function CatalogoContent() {
  const [produtos, setProdutos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos")
  const [carrinho, setCarrinho] = useState<any[]>([])
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false)
  const [produtoDetalhes, setProdutoDetalhes] = useState<any>(null)
  const [imagemAtiva, setImagemAtiva] = useState(0)
  const [hoverTimers, setHoverTimers] = useState<{[key: number]: NodeJS.Timeout | null}>({})
  const [imagemHover, setImagemHover] = useState<{[key: number]: number}>({})
  const [ordenacao, setOrdenacao] = useState("mais-vendidos")
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>('')
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState<string[]>([])
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [mostrarCheckout, setMostrarCheckout] = useState(false)
  const [mostrarConta, setMostrarConta] = useState(false)
  const [cliente, setCliente] = useState<any>(null)
  const [emailLogin, setEmailLogin] = useState('')
  const [codigoLogin, setCodigoLogin] = useState('')
  const [etapaLogin, setEtapaLogin] = useState('email') // 'email' | 'codigo'
  const [pedidosCliente, setPedidosCliente] = useState<any[]>([])
  const [dadosCliente, setDadosCliente] = useState({
    nomeCliente: '',
    email: '',
    telefone: ''
  })
  const [processandoPedido, setProcessandoPedido] = useState(false)
  
  useEffect(() => {
    carregarProdutos()
    
    // Verificar se cliente está logado
    const clienteLogado = localStorage.getItem('cliente')
    if (clienteLogado) {
      const clienteData = JSON.parse(clienteLogado)
      setCliente(clienteData)
      carregarPedidosCliente(clienteData.id)
    }
  }, [])

  const carregarProdutos = async () => {
    try {
      const response = await fetch('/api/produtos')
      if (response.ok) {
        const data = await response.json()
        setProdutos(Array.isArray(data) ? data : [])
      } else {
        console.error('Erro na API:', response.status)
        setProdutos([])
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
      setProdutos([])
    } finally {
      setLoading(false)
    }
  }

  const produtosFiltrados = (() => {
    if (!produtos || !Array.isArray(produtos)) return []
    
    let filtered = categoriaAtiva === "Todos" 
      ? produtos 
      : produtos.filter(p => p.categoria === categoriaAtiva)
    
    // Aplicar filtro de tamanhos
    if (tamanhosSelecionados.length > 0) {
      filtered = filtered.filter(p => 
        p.tamanhos && p.tamanhos.some(tamanho => tamanhosSelecionados.includes(tamanho))
      )
    }
    
    // Aplicar ordenação
    switch (ordenacao) {
      case "menor-preco":
        return filtered.sort((a, b) => a.preco - b.preco)
      case "maior-preco":
        return filtered.sort((a, b) => b.preco - a.preco)
      case "a-z":
        return filtered.sort((a, b) => a.nome.localeCompare(b.nome))
      case "z-a":
        return filtered.sort((a, b) => b.nome.localeCompare(a.nome))
      case "lancamentos":
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      default: // mais-vendidos
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }
  })()

  const adicionarAoCarrinho = (produto: any) => {
    const itemExistente = carrinho.find(item => item.id === produto.id)
    if (itemExistente) {
      setCarrinho(carrinho.map(item => 
        item.id === produto.id 
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ))
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }])
    }
  }

  const removerDoCarrinho = (id: number) => {
    setCarrinho(carrinho.filter(item => item.id !== id))
  }

  const alterarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade === 0) {
      removerDoCarrinho(id)
    } else {
      setCarrinho(carrinho.map(item => 
        item.id === id ? { ...item, quantidade: novaQuantidade } : item
      ))
    }
  }

  const totalCarrinho = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0)

  const enviarCodigo = async () => {
    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLogin })
      })
      
      if (response.ok) {
        setEtapaLogin('codigo')
        alert('Código enviado para seu email!')
      }
    } catch (error) {
      alert('Erro ao enviar código')
    }
  }
  
  const verificarCodigo = async () => {
    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLogin, code: codigoLogin })
      })
      
      if (response.ok) {
        const data = await response.json()
        setCliente(data.cliente)
        localStorage.setItem('cliente', JSON.stringify(data.cliente))
        carregarPedidosCliente(data.cliente.id)
        setMostrarConta(false)
        setEtapaLogin('email')
        setEmailLogin('')
        setCodigoLogin('')
      } else {
        alert('Código inválido')
      }
    } catch (error) {
      alert('Erro ao verificar código')
    }
  }
  
  const carregarPedidosCliente = async (clienteId: number) => {
    try {
      const response = await fetch(`/api/clientes/${clienteId}/pedidos`)
      if (response.ok) {
        const pedidos = await response.json()
        setPedidosCliente(pedidos)
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    }
  }

  const logout = () => {
    setCliente(null)
    localStorage.removeItem('cliente')
    setPedidosCliente([])
  }

  const finalizarPedido = async () => {
    // Validações de segurança
    if (!dadosCliente.nomeCliente || dadosCliente.nomeCliente.trim().length < 3) {
      alert('Nome deve ter pelo menos 3 caracteres')
      return
    }
    
    if (dadosCliente.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dadosCliente.email)) {
      alert('Email inválido')
      return
    }
    
    if (carrinho.length === 0) {
      alert('Carrinho vazio')
      return
    }
    
    setProcessandoPedido(true)
    try {
      const response = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dadosCliente,
          carrinho,
          total: totalCarrinho,
          clienteId: cliente?.id
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        
        // Enviar email de confirmação
        if (dadosCliente.email) {
          fetch('/api/pedidos/send-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pedido: { ...data.pedido, itens: carrinho } })
          })
        }
        
        alert('Pedido realizado com sucesso! Entraremos em contato via WhatsApp.')
        setCarrinho([])
        setMostrarCheckout(false)
        setDadosCliente({ nomeCliente: '', email: '', telefone: '' })
      } else {
        alert('Erro ao processar pedido. Tente novamente.')
      }
    } catch (error) {
      alert('Erro de conexão. Tente novamente.')
    } finally {
      setProcessandoPedido(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <SearchParamsHandler setCategoriaAtiva={setCategoriaAtiva} />
      </Suspense>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b">
        {/* Frete Grátis Banner */}
        <div className="bg-green-600 text-white text-center py-2 text-sm font-medium">
          🚚 FRETE GRÁTIS para todo o Brasil
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/">
            <Image src="/logohaute.png" alt="Haute Import" width={200} height={80} className="h-10 md:h-12 w-auto" />
          </a>
          
          {/* Navegação */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Início</a>
            <a href="/catalogo?categoria=Tênis" className="text-muted-foreground hover:text-foreground transition-colors">Tênis</a>
            <a href="/catalogo?categoria=Bolsas" className="text-muted-foreground hover:text-foreground transition-colors">Bolsas</a>
            <a href="/catalogo?categoria=Acessórios" className="text-muted-foreground hover:text-foreground transition-colors">Acessórios</a>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setMostrarConta(true)}
            >
              <User className="w-4 h-4 mr-1" />
              Conta
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setMostrarCarrinho(true)}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Carrinho ({carrinho.length})
              {carrinho.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground">
                  {carrinho.reduce((total, item) => total + item.quantidade, 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filtros e Ordenação */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-heading text-4xl font-bold">Catálogo Exclusivo</h1>
            <div className="text-muted-foreground">
              {produtosFiltrados.length} produtos encontrados
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Filtros de Categoria */}
            <div className="flex gap-2 flex-wrap items-center">
              {categorias.map(categoria => (
                <Button
                  key={categoria}
                  variant={categoriaAtiva === categoria ? "default" : "outline"}
                  onClick={() => setCategoriaAtiva(categoria)}
                  size="sm"
                >
                  {categoria}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Tamanhos
              </Button>
            </div>
            
            {/* Ordenação */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Ordenar por:</span>
              <select 
                className="border rounded px-3 py-1 text-sm"
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
              >
                <option value="mais-vendidos">Mais vendidos</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="lancamentos">Lançamentos</option>
              </select>
            </div>
          </div>
          
          {/* Filtros de Tamanho */}
          {mostrarFiltros && (
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-medium mb-3">Filtrar por Tamanho:</h3>
              <div className="flex flex-wrap gap-2">
                {['33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'].map(tamanho => (
                  <Button
                    key={tamanho}
                    variant={tamanhosSelecionados.includes(tamanho) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (tamanhosSelecionados.includes(tamanho)) {
                        setTamanhosSelecionados(tamanhosSelecionados.filter(t => t !== tamanho))
                      } else {
                        setTamanhosSelecionados([...tamanhosSelecionados, tamanho])
                      }
                    }}
                  >
                    {tamanho}
                  </Button>
                ))}
              </div>
              {tamanhosSelecionados.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTamanhosSelecionados([])}
                  className="mt-2"
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Grid de Produtos */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-96"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {produtosFiltrados.map(produto => (
            <Card key={produto.id} className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div 
                  className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden p-4 relative"
                  onMouseEnter={() => {
                    if (produto.imagens && produto.imagens.length > 1) {
                      const timer = setInterval(() => {
                        setImagemHover(prev => ({
                          ...prev,
                          [produto.id]: ((prev[produto.id] || 0) + 1) % produto.imagens.length
                        }))
                      }, 1000)
                      setHoverTimers(prev => ({ ...prev, [produto.id]: timer }))
                    }
                  }}
                  onMouseLeave={() => {
                    if (hoverTimers[produto.id]) {
                      clearInterval(hoverTimers[produto.id])
                      setHoverTimers(prev => ({ ...prev, [produto.id]: null }))
                      setImagemHover(prev => ({ ...prev, [produto.id]: 0 }))
                    }
                  }}
                >
                  <Image 
                    src={produto.imagens && produto.imagens.length > 1 
                      ? produto.imagens[imagemHover[produto.id] || 0] 
                      : (produto.imagens && produto.imagens.length > 0 ? produto.imagens[0] : produto.imagem)
                    } 
                    alt={produto.nome}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                  
                  {/* Badge de Desconto */}
                  {produto.precoOriginal > produto.preco && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{Math.round(((produto.precoOriginal - produto.preco) / produto.precoOriginal) * 100)}%
                    </div>
                  )}
                  
                  {produto.imagens && produto.imagens.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      +{produto.imagens.length - 1}
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">{produto.categoria}</Badge>
                    <h3 className="font-heading text-xl font-bold">{produto.nome}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(produto.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({produto.rating})</span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-2xl font-bold text-accent">
                          R$ {produto.preco.toFixed(2)}
                        </span>
                        {produto.precoOriginal > produto.preco && (
                          <span className="text-sm text-muted-foreground line-through">
                            R$ {produto.precoOriginal.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Até 12x de R$ {(produto.preco / 12).toFixed(2)} sem juros
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => adicionarAoCarrinho(produto)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setProdutoDetalhes(produto)}
                      >
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
      </div>

      {/* Modal do Carrinho */}
      {mostrarCarrinho && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="font-heading text-2xl font-bold">Seu Carrinho</h2>
                <Button variant="ghost" size="sm" onClick={() => setMostrarCarrinho(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                {carrinho.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Seu carrinho está vazio</p>
                ) : (
                  <div className="space-y-4">
                    {carrinho.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Image src={item.imagem} alt={item.nome} width={60} height={60} className="rounded" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.nome}</h4>
                          {item.tamanhoSelecionado && (
                            <p className="text-xs text-muted-foreground">Tamanho: {item.tamanhoSelecionado}</p>
                          )}
                          <p className="text-sm text-muted-foreground">R$ {item.preco.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}>
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantidade}</span>
                          <Button size="sm" variant="outline" onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}>
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => removerDoCarrinho(item.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {carrinho.length > 0 && (
                <div className="p-6 border-t space-y-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-accent">R$ {totalCarrinho.toFixed(2)}</span>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => setMostrarCheckout(true)}>
                    Finalizar Pedido
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Detalhes do Produto */}
      {produtoDetalhes && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="font-heading text-2xl font-bold">{produtoDetalhes.nome}</h2>
                <Button variant="ghost" size="sm" onClick={() => {
                  setProdutoDetalhes(null)
                  setImagemAtiva(0)
                  setTamanhoSelecionado('')
                }}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="p-6 grid md:grid-cols-2 gap-8">
                <div>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                    <Image 
                      src={produtoDetalhes.imagens && produtoDetalhes.imagens.length > 0 ? produtoDetalhes.imagens[imagemAtiva] : produtoDetalhes.imagem} 
                      alt={produtoDetalhes.nome}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                    {produtoDetalhes.imagens && produtoDetalhes.imagens.length > 1 && (
                      <>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={() => setImagemAtiva(imagemAtiva > 0 ? imagemAtiva - 1 : produtoDetalhes.imagens.length - 1)}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={() => setImagemAtiva(imagemAtiva < produtoDetalhes.imagens.length - 1 ? imagemAtiva + 1 : 0)}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                  {produtoDetalhes.imagens && produtoDetalhes.imagens.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {produtoDetalhes.imagens.map((img: string, index: number) => (
                        <div 
                          key={index} 
                          className={`w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0 cursor-pointer border-2 ${
                            index === imagemAtiva ? 'border-accent' : 'border-transparent'
                          }`}
                          onClick={() => setImagemAtiva(index)}
                        >
                          <Image src={img} alt={`${produtoDetalhes.nome} ${index + 1}`} width={64} height={64} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Badge variant="secondary" className="mb-2">{produtoDetalhes.categoria}</Badge>
                    <h3 className="font-heading text-3xl font-bold mb-2">{produtoDetalhes.nome}</h3>
                    <p className="text-muted-foreground">{produtoDetalhes.descricao}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(produtoDetalhes.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-muted-foreground">({produtoDetalhes.rating}) - 127 avaliações</span>
                  </div>

                  <div className="space-y-4">
                    {produtoDetalhes.tamanhos && produtoDetalhes.tamanhos.length > 0 && (
                      <div>
                        <h4 className="font-heading text-xl font-bold mb-3">Tamanhos Disponíveis:</h4>
                        <div className="flex flex-wrap gap-2">
                          {produtoDetalhes.tamanhos.map((tamanho: string) => (
                            <Button
                              key={tamanho}
                              variant={tamanhoSelecionado === tamanho ? "default" : "outline"}
                              size="sm"
                              onClick={() => setTamanhoSelecionado(tamanho)}
                            >
                              {tamanho}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-heading text-xl font-bold">Especificações:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Produto 100% original importado</li>
                        <li>• Garantia internacional de 1 ano</li>
                        <li>• Entrega em 15-30 dias úteis</li>
                        <li>• Rastreamento completo incluído</li>
                        <li>• Suporte pós-venda especializado</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="font-heading text-3xl font-bold text-accent">
                        R$ {produtoDetalhes.preco.toFixed(2)}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        R$ {produtoDetalhes.precoOriginal.toFixed(2)}
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        {Math.round(((produtoDetalhes.precoOriginal - produtoDetalhes.preco) / produtoDetalhes.precoOriginal) * 100)}% OFF
                      </Badge>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button 
                        className="flex-1" 
                        size="lg"
                        onClick={() => {
                          adicionarAoCarrinho({...produtoDetalhes, tamanhoSelecionado})
                          setProdutoDetalhes(null)
                          setImagemAtiva(0)
                          setTamanhoSelecionado('')
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar ao Carrinho
                      </Button>
                      <Button variant="outline" size="lg">
                        Favoritar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Checkout */}
      {mostrarCheckout && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-0">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold">Finalizar Pedido</h2>
                <Button variant="ghost" size="sm" onClick={() => setMostrarCheckout(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome Completo</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={dadosCliente.nomeCliente}
                    onChange={(e) => setDadosCliente({...dadosCliente, nomeCliente: e.target.value})}
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    value={dadosCliente.email}
                    onChange={(e) => setDadosCliente({...dadosCliente, email: e.target.value})}
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded"
                    value={dadosCliente.telefone}
                    onChange={(e) => setDadosCliente({...dadosCliente, telefone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-accent">R$ {totalCarrinho.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={finalizarPedido}
                  disabled={processandoPedido || !dadosCliente.nomeCliente}
                >
                  {processandoPedido ? 'Processando...' : 'Confirmar Pedido'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Modal da Conta */}
      {mostrarConta && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-0">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold">
                  {cliente ? 'Minha Conta' : 'Entrar na Conta'}
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setMostrarConta(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="p-6">
                {!cliente ? (
                  <div className="space-y-4">
                    {etapaLogin === 'email' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            className="w-full p-2 border rounded"
                            value={emailLogin}
                            onChange={(e) => setEmailLogin(e.target.value)}
                            placeholder="seu@email.com"
                          />
                        </div>
                        <Button onClick={enviarCodigo} className="w-full" disabled={!emailLogin}>
                          Enviar Código
                        </Button>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Código de Verificação</label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded text-center text-lg tracking-widest"
                            value={codigoLogin}
                            onChange={(e) => setCodigoLogin(e.target.value)}
                            placeholder="000000"
                            maxLength={6}
                          />
                          <p className="text-xs text-muted-foreground mt-1">Enviado para {emailLogin}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setEtapaLogin('email')} className="flex-1">
                            Voltar
                          </Button>
                          <Button onClick={verificarCodigo} className="flex-1" disabled={codigoLogin.length !== 6}>
                            Verificar
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b">
                      <p className="text-sm text-muted-foreground">Logado como:</p>
                      <p className="font-medium">{cliente.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Meus Pedidos ({pedidosCliente.length})</h3>
                      {pedidosCliente.length === 0 ? (
                        <div className="text-sm text-muted-foreground">
                          Nenhum pedido encontrado.
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {pedidosCliente.map(pedido => (
                            <div key={pedido.id} className="border rounded p-2 text-sm">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">Pedido #{pedido.id}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(pedido.createdAt).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">R$ {pedido.total.toFixed(2)}</p>
                                  <Badge variant={pedido.status === 'pendente' ? 'secondary' : 'default'} className="text-xs">
                                    {pedido.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Button variant="outline" onClick={logout} className="w-full">
                      Sair da Conta
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><p>Carregando...</p></div>}>
      <CatalogoContent />
    </Suspense>
  )
}