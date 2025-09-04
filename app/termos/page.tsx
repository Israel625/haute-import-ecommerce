import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HauteLogo } from "@/components/haute-logo"
import Image from "next/image"
import { ArrowLeft, FileText } from "lucide-react"

export default function TermosPage() {
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
          <FileText className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="font-heading text-4xl font-bold mb-4">Termos de Uso</h1>
          <p className="text-muted-foreground text-lg">Condições para uso de nossos serviços</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Aceitação dos Termos</h3>
              <p className="text-muted-foreground">
                Ao utilizar nossos serviços, você concorda com estes termos de uso. 
                Se não concordar, não utilize nossos serviços.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Produtos e Serviços</h3>
              <p className="text-muted-foreground">
                Oferecemos serviços de importação de produtos de moda. Todos os produtos são originais 
                e importados legalmente. Preços podem variar conforme cotação do dólar.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Responsabilidades</h3>
              <p className="text-muted-foreground">
                O cliente é responsável por fornecer dados corretos para entrega. 
                A Haute Import não se responsabiliza por atrasos causados pela Receita Federal ou Correios.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading text-xl font-bold mb-4">Pagamentos</h3>
              <p className="text-muted-foreground">
                Pagamentos são realizados via Pix. O produto só é encomendado após confirmação do pagamento. 
                Não há reembolso após o produto ser despachado.
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