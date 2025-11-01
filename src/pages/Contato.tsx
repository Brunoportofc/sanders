import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contato = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-12 sm:py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" style={{ color: '#066ba5' }}>
              Entre em Contato
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed" style={{ color: '#066ba5' }}>
              Nossa equipe está pronta para atender suas necessidades. 
              Entre em contato e descubra como podemos ajudar sua instituição.
            </p>
          </div>
        </div>
      </section>

      {/* Informações de Contato */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Endereço</h3>
                <div className="text-muted-foreground space-y-1">
                  <p>Rua Industrial, 123</p>
                  <p>Distrito Industrial</p>
                  <p>Santa Rita do Sapucaí - MG</p>
                  <p>CEP: 37540-000</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Telefones</h3>
                <div className="text-muted-foreground space-y-2">
                  <p>Vendas: (35) 3471-9000</p>
                  <p>Suporte: (35) 3471-9001</p>
                  <p>WhatsApp: (35) 9 9999-0000</p>
                  <p>0800 123 4567</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">E-mail</h3>
                <div className="text-muted-foreground space-y-2">
                  <p>contato@sandersdobrasil.com.br</p>
                  <p>vendas@sandersdobrasil.com.br</p>
                  <p>suporte@sandersdobrasil.com.br</p>
                  <p>comercial@sandersdobrasil.com.br</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Horário de Funcionamento */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-sanders-blue mr-3" />
                <h3 className="text-xl font-semibold">Horário de Funcionamento</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div>
                  <h4 className="font-medium mb-2">Comercial e Vendas</h4>
                  <div className="text-muted-foreground space-y-1">
                    <p>Segunda a Sexta: 8h às 18h</p>
                    <p>Sábado: 8h às 12h</p>
                    <p>Domingo: Fechado</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Suporte Técnico</h4>
                  <div className="text-muted-foreground space-y-1">
                    <p>Segunda a Sexta: 7h às 19h</p>
                    <p>Sábado: 8h às 12h</p>
                    <p>Emergências: 24h</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Envie sua Mensagem</h2>
              <p className="text-muted-foreground">
                Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome Completo *</label>
                      <Input placeholder="Seu nome completo" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">E-mail *</label>
                      <Input type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Telefone *</label>
                      <Input placeholder="(00) 00000-0000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Empresa/Instituição</label>
                      <Input placeholder="Nome da empresa" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Setor/Área *</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o setor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hospital">Hospital</SelectItem>
                          <SelectItem value="clinica">Clínica</SelectItem>
                          <SelectItem value="odontologia">Odontologia</SelectItem>
                          <SelectItem value="laboratorio">Laboratório</SelectItem>
                          <SelectItem value="farmacia">Farmácia</SelectItem>
                          <SelectItem value="veterinaria">Veterinária</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Assunto</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o assunto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cotacao">Solicitação de Cotação</SelectItem>
                          <SelectItem value="duvida">Dúvida Técnica</SelectItem>
                          <SelectItem value="suporte">Suporte/Assistência</SelectItem>
                          <SelectItem value="garantia">Garantia</SelectItem>
                          <SelectItem value="parceria">Parceria</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mensagem *</label>
                    <Textarea 
                      placeholder="Descreva sua necessidade, dúvida ou solicitação..."
                      className="min-h-32"
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="terms" className="mt-1" />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      Concordo em receber comunicações da Sanders do Brasil e estou ciente da 
                      <a href="#" className="text-sanders-blue hover:underline"> Política de Privacidade</a>
                    </label>
                  </div>
                  
                  <Button size="lg" className="w-full md:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Nossa Localização</h2>
            <p className="text-muted-foreground">
              Visite nosso showroom e conheça nossos produtos pessoalmente
            </p>
          </div>
          
          <div className="bg-sanders-blue-light rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mapa Interativo</h3>
              <p>Google Maps será integrado aqui</p>
              <p className="text-sm mt-2">Santa Rita do Sapucaí, MG</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;