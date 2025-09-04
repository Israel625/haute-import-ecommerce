import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HauteLogo } from "@/components/haute-logo"
import Image from "next/image"
import { ArrowLeft, Cookie } from "lucide-react"

export default function CookiesPage() {
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
          <Cookie className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="font-heading text-4xl font-bold mb-4">Política de Cookies</h1>
          <p className="text-muted-foreground text-lg">Como utilizamos cookies em nosso site</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">O que são Cookies</h3>
              <p className="text-muted-foreground">
                Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita nosso site. 
                Eles nos ajudam a melhorar sua experiência de navegação.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Como Utilizamos</h3>
              <div className="text-muted-foreground space-y-2">
                <p>• <strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site</p>
                <p>• <strong>Cookies de Preferência:</strong> Lembram suas configurações</p>
                <p>• <strong>Cookies Analíticos:</strong> Nos ajudam a entender como você usa o site</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Gerenciar Cookies</h3>
              <p className="text-muted-foreground">
                Você pode controlar e excluir cookies através das configurações do seu navegador. 
                Note que desabilitar cookies pode afetar a funcionalidade do site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Cookies de Terceiros</h3>
              <p className="text-muted-foreground">
                Podemos usar serviços de terceiros como Google Analytics para melhorar nosso site. 
                Estes serviços podem definir seus próprios cookies.
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