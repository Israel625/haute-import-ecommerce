import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HauteLogo } from "@/components/haute-logo"
import Image from "next/image"
import { ArrowLeft, Shield } from "lucide-react"

export default function PrivacidadePage() {
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
          <h1 className="font-heading text-4xl font-bold mb-4">Política de Privacidade</h1>
          <p className="text-muted-foreground text-lg">Como protegemos seus dados</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Coleta de Dados</h3>
              <p className="text-muted-foreground">
                Coletamos apenas as informações necessárias para processar seus pedidos: nome, endereço, 
                telefone e email. Estes dados são utilizados exclusivamente para entrega e comunicação sobre seu pedido.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Uso dos Dados</h3>
              <p className="text-muted-foreground">
                Seus dados são utilizados para: processar pedidos, enviar atualizações sobre entregas, 
                fornecer suporte ao cliente e melhorar nossos serviços. Nunca compartilhamos suas informações 
                com terceiros sem seu consentimento.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Segurança</h3>
              <p className="text-muted-foreground">
                Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados 
                contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Seus Direitos</h3>
              <p className="text-muted-foreground">
                Você tem direito de acessar, corrigir ou excluir seus dados pessoais. 
                Entre em contato conosco via WhatsApp para exercer esses direitos.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">Última atualização: Setembro 2025</p>
        </div>
      </div>
    </div>
  )
}