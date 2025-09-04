import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HauteLogo } from "@/components/haute-logo"
import Image from "next/image"
import { ArrowLeft, Headphones, MessageCircle, Mail, HelpCircle } from "lucide-react"

export default function SuportePage() {
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
          <Headphones className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="font-heading text-4xl font-bold mb-4">Suporte</h1>
          <p className="text-muted-foreground text-lg">Estamos aqui para ajudar você</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-heading text-xl font-bold">WhatsApp</h3>
              </div>
              <p className="text-muted-foreground mb-4">Atendimento rápido e personalizado</p>
              <a href="https://wa.me/5511999999999" target="_blank">
                <Button className="w-full bg-green-500 hover:bg-green-600">Abrir Chat</Button>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-accent" />
                <h3 className="font-heading text-xl font-bold">FAQ</h3>
              </div>
              <p className="text-muted-foreground mb-4">Perguntas mais frequentes</p>
              <a href="/faq">
                <Button variant="outline" className="w-full">Ver FAQ</Button>
              </a>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-heading text-xl font-bold mb-4">Como Podemos Ajudar</h3>
            <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <p>• Dúvidas sobre produtos</p>
                <p>• Problemas com pedidos</p>
                <p>• Rastreamento de encomendas</p>
              </div>
              <div>
                <p>• Questões de garantia</p>
                <p>• Suporte técnico</p>
                <p>• Informações gerais</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}