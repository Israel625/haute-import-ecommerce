import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HauteLogo } from "@/components/haute-logo"
import { LeafIcon } from "@/components/leaf-icon"
import { ArrowRight, Star, Users, Award, Sparkles, Instagram, MessageCircle } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Floating Social Icons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://chat.whatsapp.com/D8oNL9W4XgeLGMPfx01H2Z?fbclid=PAZXh0bgNhZW0CMTEAAacuwXJuNQNthG0vdaBMx--Qu2u_N-Sh9uegUirApQSY6k-_PJ1CKPIT-f1cZg_aem_k3Z-05tpRZ4HxLqDMBj0xA"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
        <a
          href="https://www.instagram.com/hauteimportbr/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Instagram className="w-7 h-7" />
        </a>
      </div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center mb-1">
            {/* Logo corrigida - versão 2.0 */}
            <Image 
              src="/logohaute.png" 
              alt="Haute Import" 
              width={600} 
              height={240} 
              className="h-32 md:h-40 w-auto object-contain max-w-full" 
              priority
              style={{ maxHeight: '10rem' }}
            />
          </div>

          <div className="space-y-2">
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-balance leading-tight">
              Moda Importada Exclusiva
            </h1>
            <p className="font-body text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Tênis, Bolsas e Acessórios Premium Direto do Exterior
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a href="/catalogo">
              <Button
                size="lg"
                className="bg-primary hover:bg-accent text-primary-foreground font-body text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Ver Catálogo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="#como-comprar">
              <Button
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-body text-lg px-8 py-4 rounded-xl transition-all duration-300 bg-transparent"
              >
                Como Comprar
              </Button>
            </a>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 opacity-30">
          <Image src="/haute.png" alt="Haute" width={128} height={128} className="w-32 h-32" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-30">
          <Image src="/haute.png" alt="Haute" width={96} height={96} className="w-24 h-24" />
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Por Que Escolher a Haute?</h2>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
              Três diferenciais que fazem da Haute sua melhor escolha em importados
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-accent/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-2xl font-bold">Exclusividade</h3>
                <p className="font-body text-muted-foreground">
                  Peças únicas e limitadas que você não encontra em lojas convencionais do Brasil.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-accent/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-2xl font-bold">Qualidade Premium</h3>
                <p className="font-body text-muted-foreground">
                  Produtos originais das melhores marcas internacionais com garantia de autenticidade.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-accent/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-2xl font-bold">Processo Seguro</h3>
                <p className="font-body text-muted-foreground">
                  Importação confiável com rastreamento completo e suporte em todas as etapas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Nossa Missão</h2>
                <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
                  Na HAUTE, conectamos você às melhores marcas internacionais de tênis, bolsas e moda exclusiva. 
                  Trazemos diretamente do exterior peças únicas que definem seu estilo pessoal.
                </p>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  Nosso compromisso é oferecer produtos autênticos com processo de importação transparente, 
                  seguro e com acompanhamento completo até sua porta.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-accent mb-2">100%</div>
                  <div className="font-body text-sm text-muted-foreground">Produtos Originais</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-accent mb-2">15-30</div>
                  <div className="font-body text-sm text-muted-foreground">Dias Úteis</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-accent mb-2">24/7</div>
                  <div className="font-body text-sm text-muted-foreground">Suporte Online</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gray-50 rounded-3xl flex items-center justify-center overflow-hidden">
                <Image src="/maoss.png" alt="Mãos" width={300} height={300} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Comprar Section */}
      <section id="como-comprar" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Como Comprar na Haute Import</h2>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Adquira moda importada exclusiva com um processo simples e seguro. Escolha uma das opções:
            </p>
            <div className="flex justify-center gap-4">
              <a href="/catalogo">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Comprar pelo Catálogo Online
                </Button>
              </a>
              <span className="text-muted-foreground flex items-center">ou</span>
            </div>
            <p className="font-body text-lg text-muted-foreground mt-4">
              Siga os passos abaixo para pedidos personalizados:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-accent/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <span className="text-2xl font-bold text-accent">1</span>
                </div>
                <h3 className="font-heading text-xl font-bold">Envie Suas Escolhas</h3>
                <p className="font-body text-muted-foreground text-sm">
                  Envie fotos dos produtos desejados, com os tamanhos, diretamente no privado (PV) da Haute via WhatsApp ou Instagram.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-accent/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <span className="text-2xl font-bold text-accent">2</span>
                </div>
                <h3 className="font-heading text-xl font-bold">Confirme o Valor</h3>
                <p className="font-body text-muted-foreground text-sm">
                  O vendedor enviará o orçamento em dólar. Peça a conversão para reais e solicite a chave Pix para pagamento.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-accent/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <span className="text-2xl font-bold text-accent">3</span>
                </div>
                <h3 className="font-heading text-xl font-bold">Finalize o Pagamento</h3>
                <p className="font-body text-muted-foreground text-sm">
                  Realize o pagamento via Pix, envie o comprovante e informe os dados completos do endereço de entrega.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-accent/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <span className="text-2xl font-bold text-accent">4</span>
                </div>
                <h3 className="font-heading text-xl font-bold">Acompanhe Sua Encomenda</h3>
                <p className="font-body text-muted-foreground text-sm">
                  Em 3 a 6 dias, você receberá um vídeo do produto e a etiqueta de rastreamento. Cadastre-se no site dos Correios na aba "Minhas Importações".
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-card rounded-xl border border-accent/20">
            <p className="font-body text-sm text-muted-foreground text-center">
              <strong>Observação:</strong> Certifique-se de que todas as informações fornecidas são verdadeiras e válidas. 
              A Haute Import não se responsabiliza por problemas decorrentes de dados incorretos.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Clientes Satisfeitos</h2>
            <p className="font-body text-xl text-muted-foreground">
              Depoimentos reais de quem já comprou com a Haute Import
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="font-body text-muted-foreground mb-6 italic">
                  "Recebi meu tênis Jordan exclusivo em perfeito estado. Processo super transparente e rápido!"
                </blockquote>
                <div className="font-heading font-semibold">Marina Silva</div>
                <div className="font-body text-sm text-muted-foreground">São Paulo, SP</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="font-body text-muted-foreground mb-6 italic">
                  "A bolsa Louis Vuitton chegou exatamente como mostrado no vídeo. Qualidade impecável!"
                </blockquote>
                <div className="font-heading font-semibold">Carlos Mendes</div>
                <div className="font-body text-sm text-muted-foreground">Rio de Janeiro, RJ</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="font-body text-muted-foreground mb-6 italic">
                  "Já é minha terceira compra. Confio totalmente no trabalho da Haute para peças exclusivas."
                </blockquote>
                <div className="font-heading font-semibold">Ana Costa</div>
                <div className="font-body text-sm text-muted-foreground">Brasília, DF</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-balance">Pronto para Sua Próxima Peça Exclusiva?</h2>
            <p className="font-body text-xl md:text-2xl opacity-90 text-balance max-w-2xl mx-auto">
              Descubra tênis, bolsas e acessórios únicos que você só encontra aqui.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a href="https://chat.whatsapp.com/D8oNL9W4XgeLGMPfx01H2Z?fbclid=PAZXh0bgNhZW0CMTEAAacuwXJuNQNthG0vdaBMx--Qu2u_N-Sh9uegUirApQSY6k-_PJ1CKPIT-f1cZg_aem_k3Z-05tpRZ4HxLqDMBj0xA" target="_blank">
              <Button
                size="lg"
                variant="secondary"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-body text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                Fazer Pedido Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="/catalogo">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-body text-lg px-8 py-4 rounded-xl transition-all duration-300 bg-transparent"
              >
                Ver Catálogo
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-card border-t border-accent/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <Image src="/logohaute.png" alt="Haute Import" width={240} height={96} className="h-16 md:h-20 w-auto" />
              <p className="font-body text-muted-foreground">
                Sua conexão com a moda internacional. Tênis, bolsas e acessórios exclusivos direto do exterior.
              </p>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4">Produtos</h3>
              <ul className="font-body space-y-2 text-muted-foreground">
                <li>
                  <a href="/catalogo?categoria=Tênis" className="hover:text-accent transition-colors">
                    Tênis Exclusivos
                  </a>
                </li>
                <li>
                  <a href="/catalogo?categoria=Bolsas" className="hover:text-accent transition-colors">
                    Bolsas de Grife
                  </a>
                </li>
                <li>
                  <a href="/catalogo?categoria=Acessórios" className="hover:text-accent transition-colors">
                    Acessórios
                  </a>
                </li>
                <li>
                  <a href="/catalogo" className="hover:text-accent transition-colors">
                    Lançamentos
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4">Serviços</h3>
              <ul className="font-body space-y-2 text-muted-foreground">
                <li>
                  <a href="#como-comprar" className="hover:text-accent transition-colors">
                    Como Comprar
                  </a>
                </li>
                <li>
                  <a href="/rastreamento" className="hover:text-accent transition-colors">
                    Rastreamento
                  </a>
                </li>
                <li>
                  <a href="/garantia" className="hover:text-accent transition-colors">
                    Garantia
                  </a>
                </li>
                <li>
                  <a href="/suporte" className="hover:text-accent transition-colors">
                    Suporte
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4">Contato</h3>
              <ul className="font-body space-y-2 text-muted-foreground">
                <li>
                  <a href="https://chat.whatsapp.com/D8oNL9W4XgeLGMPfx01H2Z?fbclid=PAZXh0bgNhZW0CMTEAAacuwXJuNQNthG0vdaBMx--Qu2u_N-Sh9uegUirApQSY6k-_PJ1CKPIT-f1cZg_aem_k3Z-05tpRZ4HxLqDMBj0xA" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/hauteimportbr/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="/contato" className="hover:text-accent transition-colors">
                    Atendimento
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-accent transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-accent/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="font-body text-muted-foreground text-sm">© 2025 HAUTE. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/privacidade" className="font-body text-muted-foreground hover:text-accent transition-colors text-sm">
                Privacidade
              </a>
              <a href="/termos" className="font-body text-muted-foreground hover:text-accent transition-colors text-sm">
                Termos
              </a>
              <a href="/cookies" className="font-body text-muted-foreground hover:text-accent transition-colors text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
