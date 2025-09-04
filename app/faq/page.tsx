import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HauteLogo } from "@/components/haute-logo"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function FAQPage() {
  const faqs = [
    {
      pergunta: "Como funciona o processo de importação?",
      resposta: "Você escolhe o produto, fazemos o orçamento, você paga via Pix e acompanhamos todo o processo até a entrega na sua casa."
    },
    {
      pergunta: "Quanto tempo demora para chegar?",
      resposta: "O prazo médio é de 15 a 30 dias úteis, dependendo da alfândega e localização de entrega."
    },
    {
      pergunta: "Os produtos são originais?",
      resposta: "Sim, todos os produtos são 100% originais e autênticos, importados diretamente das marcas oficiais."
    },
    {
      pergunta: "Posso rastrear meu pedido?",
      resposta: "Sim, você receberá o código de rastreamento e pode acompanhar pelo site dos Correios na aba 'Minhas Importações'."
    },
    {
      pergunta: "Qual a forma de pagamento?",
      resposta: "Aceitamos pagamento via Pix. O valor é calculado em dólar e convertido para reais no momento da compra."
    },
    {
      pergunta: "Tem garantia?",
      resposta: "Sim, todos os produtos têm garantia internacional de 1 ano contra defeitos de fabricação."
    }
  ]

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
          <h1 className="font-heading text-4xl font-bold mb-4">Perguntas Frequentes</h1>
          <p className="text-muted-foreground text-lg">Tire suas dúvidas sobre nossos produtos e serviços</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-bold mb-3">{faq.pergunta}</h3>
                <p className="text-muted-foreground">{faq.resposta}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Não encontrou sua resposta?</p>
          <a href="https://wa.me/5511999999999" target="_blank">
            <Button>Fale Conosco no WhatsApp</Button>
          </a>
        </div>
      </div>
    </div>
  )
}