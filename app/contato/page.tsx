import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HauteLogo } from "@/components/haute-logo"
import Image from "next/image"
import { ArrowLeft, MessageCircle, Instagram, Mail, Clock } from "lucide-react"

export default function ContatoPage() {
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
          <h1 className="font-heading text-4xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-muted-foreground text-lg">Estamos aqui para ajudar você</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-heading text-xl font-bold">WhatsApp</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Nosso canal principal de atendimento. Resposta rápida e personalizada.
              </p>
              <a href="https://wa.me/5511999999999" target="_blank">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Abrir WhatsApp
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Instagram className="w-6 h-6 text-pink-500" />
                <h3 className="font-heading text-xl font-bold">Instagram</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Siga nosso perfil e veja os últimos lançamentos e novidades.
              </p>
              <a href="https://instagram.com/hauteimportbr" target="_blank">
                <Button variant="outline" className="w-full">
                  Seguir no Instagram
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-accent" />
              <h3 className="font-heading text-xl font-bold">Horário de Atendimento</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <p><strong>Segunda a Sexta:</strong> 9h às 18h</p>
                <p><strong>Sábado:</strong> 9h às 14h</p>
              </div>
              <div>
                <p><strong>Domingo:</strong> Fechado</p>
                <p><strong>Feriados:</strong> Fechado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}