import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HauteLogo } from "@/components/haute-logo"
import Image from "next/image"
import { ArrowLeft, Shield, CheckCircle } from "lucide-react"

export default function GarantiaPage() {
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
          <Shield className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="font-heading text-4xl font-bold mb-4">Garantia</h1>
          <p className="text-muted-foreground text-lg">Proteção total para suas compras</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Garantia Internacional</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <p className="text-muted-foreground">12 meses contra defeitos de fabricação</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <p className="text-muted-foreground">Produtos 100% originais</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <p className="text-muted-foreground">Suporte técnico especializado</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Como Acionar</h3>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Entre em contato via WhatsApp</li>
                <li>2. Informe o código do pedido</li>
                <li>3. Descreva o problema</li>
                <li>4. Envie fotos se necessário</li>
                <li>5. Aguarde nossa análise</li>
              </ol>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-heading text-xl font-bold mb-4">Termos da Garantia</h3>
            <div className="text-muted-foreground space-y-2">
              <p>• A garantia cobre apenas defeitos de fabricação</p>
              <p>• Não cobre danos por uso inadequado ou desgaste natural</p>
              <p>• Produto deve estar em condições originais</p>
              <p>• Prazo de 30 dias para comunicar problemas após recebimento</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <a href="https://wa.me/5511999999999" target="_blank">
            <Button>Acionar Garantia</Button>
          </a>
        </div>
      </div>
    </div>
  )
}