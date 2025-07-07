import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, CheckCircle, Phone, Mail, Download } from "lucide-react";

const QueroComprar = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Quero Comprar
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Solicite uma cotação personalizada e descubra as melhores soluções 
              em equipamentos hospitalares e odontológicos para sua instituição.
            </p>
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Por que Escolher a Sanders?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mais de 30 anos oferecendo equipamentos de qualidade com suporte completo
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Qualidade Garantida</h3>
                <p className="text-sm text-muted-foreground">
                  Equipamentos com certificação ANVISA e ISO 13485
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Suporte Técnico</h3>
                <p className="text-sm text-muted-foreground">
                  Assistência especializada com técnicos treinados
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Garantia Estendida</h3>
                <p className="text-sm text-muted-foreground">
                  Até 3 anos de garantia com manutenção preventiva
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Financiamento</h3>
                <p className="text-sm text-muted-foreground">
                  Condições especiais de pagamento e financiamento
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulário de Cotação */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Solicite sua Cotação</h2>
              <p className="text-muted-foreground">
                Preencha o formulário e receba uma proposta personalizada em até 24 horas
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <form className="space-y-8">
                  {/* Dados Pessoais */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dados de Contato</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nome Completo *</label>
                        <Input placeholder="Seu nome completo" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">E-mail *</label>
                        <Input type="email" placeholder="seu@email.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Telefone *</label>
                        <Input placeholder="(00) 00000-0000" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">WhatsApp</label>
                        <Input placeholder="(00) 00000-0000" />
                      </div>
                    </div>
                  </div>

                  {/* Dados da Empresa */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dados da Instituição</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nome da Empresa/Instituição *</label>
                        <Input placeholder="Hospital XYZ Ltda" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CNPJ</label>
                        <Input placeholder="00.000.000/0001-00" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tipo de Instituição *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hospital">Hospital</SelectItem>
                            <SelectItem value="clinica">Clínica</SelectItem>
                            <SelectItem value="posto-saude">Posto de Saúde</SelectItem>
                            <SelectItem value="consultorio-odonto">Consultório Odontológico</SelectItem>
                            <SelectItem value="laboratorio">Laboratório</SelectItem>
                            <SelectItem value="veterinaria">Clínica Veterinária</SelectItem>
                            <SelectItem value="farmacia">Farmácia</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Porte da Instituição</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o porte" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pequeno">Pequeno (até 50 leitos/consultórios)</SelectItem>
                            <SelectItem value="medio">Médio (51-200 leitos/consultórios)</SelectItem>
                            <SelectItem value="grande">Grande (mais de 200 leitos/consultórios)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Estado *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="UF" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mg">Minas Gerais</SelectItem>
                            <SelectItem value="sp">São Paulo</SelectItem>
                            <SelectItem value="rj">Rio de Janeiro</SelectItem>
                            <SelectItem value="es">Espírito Santo</SelectItem>
                            <SelectItem value="outros">Outros Estados</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Cidade *</label>
                        <Input placeholder="Sua cidade" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CEP</label>
                        <Input placeholder="00000-000" />
                      </div>
                    </div>
                  </div>

                  {/* Produtos de Interesse */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Produtos de Interesse</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Categoria *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hospitalares">Equipamentos Hospitalares</SelectItem>
                            <SelectItem value="odontologicos">Equipamentos Odontológicos</SelectItem>
                            <SelectItem value="ambos">Ambas as Categorias</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Produtos Específicos (selecione todos os de interesse)</label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            "Autoclave Horizontal",
                            "Autoclave Vertical", 
                            "Lavadora Ultrassônica",
                            "Estufa de Secagem",
                            "Autoclave Odontológica",
                            "Fotopolimerizador",
                            "Seladora de Grau Cirúrgico",
                            "Termodesinfectora"
                          ].map((produto) => (
                            <div key={produto} className="flex items-center space-x-2">
                              <Checkbox id={produto} />
                              <label htmlFor={produto} className="text-sm">{produto}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Quantidade Estimada</label>
                        <Input placeholder="Ex: 2 autoclaves, 1 lavadora..." />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Prazo para Aquisição</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o prazo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="imediato">Imediato (até 30 dias)</SelectItem>
                            <SelectItem value="trimestre">Até 3 meses</SelectItem>
                            <SelectItem value="semestre">Até 6 meses</SelectItem>
                            <SelectItem value="ano">Até 1 ano</SelectItem>
                            <SelectItem value="indefinido">Ainda não definido</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Informações Adicionais */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Informações Adicionais</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Orçamento Previsto</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Faixa de investimento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ate-10k">Até R$ 10.000</SelectItem>
                            <SelectItem value="10k-25k">R$ 10.000 - R$ 25.000</SelectItem>
                            <SelectItem value="25k-50k">R$ 25.000 - R$ 50.000</SelectItem>
                            <SelectItem value="50k-100k">R$ 50.000 - R$ 100.000</SelectItem>
                            <SelectItem value="acima-100k">Acima de R$ 100.000</SelectItem>
                            <SelectItem value="nao-definido">Não definido</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Forma de Pagamento Preferida</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a forma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vista">À vista</SelectItem>
                            <SelectItem value="parcelado">Parcelado</SelectItem>
                            <SelectItem value="financiamento">Financiamento</SelectItem>
                            <SelectItem value="leasing">Leasing</SelectItem>
                            <SelectItem value="licitacao">Licitação</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Observações</label>
                        <Textarea 
                          placeholder="Descreva requisitos específicos, condições especiais, ou qualquer informação adicional..."
                          className="min-h-24"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Termo de Consentimento */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="contato" />
                      <label htmlFor="contato" className="text-sm text-muted-foreground">
                        Autorizo o contato da Sanders do Brasil para envio de cotações e informações comerciais
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox id="newsletter" />
                      <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                        Desejo receber newsletter com novidades e conteúdo técnico
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox id="privacidade" />
                      <label htmlFor="privacidade" className="text-sm text-muted-foreground">
                        Li e concordo com a <a href="#" className="text-sanders-blue hover:underline">Política de Privacidade</a> *
                      </label>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button size="lg" className="flex-1">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Solicitar Cotação
                    </Button>
                    <Button variant="outline" size="lg">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Catálogo
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contato Direto */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Prefere Falar Diretamente?</h2>
            <p className="text-muted-foreground">
              Nossa equipe comercial está pronta para atendê-lo
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-sanders-blue mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Telefone</h3>
                <p className="text-sm text-muted-foreground mb-3">(35) 3471-9000</p>
                <Button variant="outline" size="sm">Ligar Agora</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-sanders-blue mx-auto mb-3" />
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground mb-3">(35) 9 9999-0000</p>
                <Button variant="outline" size="sm">Conversar</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-sanders-blue mx-auto mb-3" />
                <h3 className="font-semibold mb-2">E-mail</h3>
                <p className="text-sm text-muted-foreground mb-3">vendas@sandersdobrasil.com.br</p>
                <Button variant="outline" size="sm">Enviar E-mail</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QueroComprar;