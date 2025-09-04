import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HauteLogo } from "@/components/haute-logo"
import Image from "next/image"
import { ArrowLeft, Search } from "lucide-react"

export default function RastreamentoPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Image src="/logohaute.png" alt="Haute Import" width={180} height={72} className="h-8 md:h-10 w-auto" />
          <a href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold mb-4">Rastreamento de Pedidos</h1>
          <p className="text-muted-foreground text-lg">Acompanhe sua encomenda em tempo real</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="codigo">Código de Rastreamento</Label>
                <div className="flex gap-2">
                  <Input 
                    id="codigo" 
                    placeholder="Digite o código de rastreamento" 
                    className="flex-1"
                  />
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Rastrear
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Como Rastrear</h3>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Acesse o site dos Correios</li>
                <li>2. Vá em "Minhas Importações"</li>
                <li>3. Cadastre-se com seu CPF</li>
                <li>4. Digite o código de rastreamento</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Links Úteis</h3>
              <div className="space-y-2">
                <a href="https://www2.correios.com.br/sistemas/rastreamento/" target="_blank" className="block text-accent hover:underline">
                  Rastreamento Correios
                </a>
                <a href="https://apps.correios.com.br/portaldoimportador" target="_blank" className="block text-accent hover:underline">
                  Portal do Importador
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}