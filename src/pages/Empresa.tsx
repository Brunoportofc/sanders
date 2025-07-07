import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, MapPin, Users, Target, Eye, Heart } from "lucide-react";

const Empresa = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre a Sanders do Brasil
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Pioneiros em equipamentos hospitalares e odontológicos, 
              oferecendo soluções inovadoras há mais de 30 anos.
            </p>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Nossa História</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Fundada em 1990 em Santa Rita do Sapucaí, Minas Gerais, a Sanders do Brasil 
                  nasceu com o objetivo de revolucionar o mercado de equipamentos médicos no país.
                </p>
                <p>
                  Iniciamos nossa jornada com foco em autoclaves e equipamentos de esterilização, 
                  expandindo gradualmente nosso portfólio para atender hospitais, clínicas e 
                  consultórios odontológicos em todo o território nacional.
                </p>
                <p>
                  Hoje, somos reconhecidos pela qualidade excepcional de nossos produtos, 
                  inovação constante e comprometimento com a excelência no atendimento ao cliente.
                </p>
              </div>
            </div>
            <div className="bg-sanders-blue-light rounded-2xl p-8 text-center">
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-sanders-blue">30+</div>
                  <div className="text-sm text-muted-foreground">Anos de Experiência</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-sanders-blue">5000+</div>
                  <div className="text-sm text-muted-foreground">Clientes Atendidos</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-sanders-blue">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfação dos Clientes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Nossa Localização</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estrategicamente localizada no polo tecnológico de Santa Rita do Sapucaí, 
              a "Vale do Silício" de Minas Gerais.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-sanders-blue mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Endereço Completo</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Rua Industrial, 123</p>
                      <p>Distrito Industrial</p>
                      <p>Santa Rita do Sapucaí - MG</p>
                      <p>CEP: 37540-000</p>
                    </div>
                    <div className="mt-4">
                      <p className="font-medium">Horário de Funcionamento:</p>
                      <p className="text-sm text-muted-foreground">Segunda a Sexta: 8h às 18h</p>
                      <p className="text-sm text-muted-foreground">Sábado: 8h às 12h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-sanders-blue-light rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <p>Mapa Interativo</p>
                <p className="text-sm">Google Maps integração</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificações */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Certificações e Qualidade</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nosso compromisso com a qualidade é reconhecido pelas principais 
              certificações nacionais e internacionais.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-sanders-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">ISO 13485</h3>
                <p className="text-sm text-muted-foreground">
                  Certificação internacional para sistemas de gestão da qualidade 
                  em dispositivos médicos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-sanders-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">ANVISA</h3>
                <p className="text-sm text-muted-foreground">
                  Registro na Agência Nacional de Vigilância Sanitária para 
                  todos os nossos produtos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-sanders-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">CE Marking</h3>
                <p className="text-sm text-muted-foreground">
                  Conformidade europeia para exportação e padrões 
                  internacionais de qualidade.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-sanders-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Missão</h3>
                <p className="text-muted-foreground">
                  Fornecer equipamentos hospitalares e odontológicos de alta qualidade, 
                  contribuindo para a saúde e bem-estar da população brasileira.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8 text-center">
                <Eye className="h-12 w-12 text-sanders-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Visão</h3>
                <p className="text-muted-foreground">
                  Ser referência nacional em equipamentos médicos, reconhecida pela 
                  inovação, qualidade e excelência no atendimento.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-sanders-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Valores</h3>
                <p className="text-muted-foreground">
                  Qualidade, Inovação, Comprometimento, Sustentabilidade e 
                  Foco no Cliente são os pilares de nossa atuação.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pós-venda */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Pós-venda e Garantia</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nosso compromisso com você não termina na venda. Oferecemos suporte 
              completo durante toda a vida útil do equipamento.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Suporte Técnico</h3>
              <p className="text-sm text-muted-foreground">
                Equipe especializada disponível para atendimento personalizado.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Garantia Estendida</h3>
              <p className="text-sm text-muted-foreground">
                Até 3 anos de garantia com manutenção preventiva incluída.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Peças Originais</h3>
              <p className="text-sm text-muted-foreground">
                Estoque permanente de peças e acessórios originais.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Treinamento</h3>
              <p className="text-sm text-muted-foreground">
                Capacitação da equipe para uso correto dos equipamentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Empresa;