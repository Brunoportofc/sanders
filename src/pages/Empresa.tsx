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
      <section className="bg-gradient-hero py-12 sm:py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6" style={{ color: '#066ba5' }}>
              Sobre a Sanders do Brasil
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed" style={{ color: '#066ba5' }}>
              Com 23 anos de atuação, somos fabricantes 100% nacionais de equipamentos hospitalares 
              de alta tecnologia, com foco em limpeza, secagem, desinfecção e esterilização.
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
                  Com 23 anos de atuação, a Sanders do Brasil está localizada em Santa Rita do Sapucaí, Minas Gerais, 
                  reconhecida como o Vale da Eletrônica. Nossa posição estratégica a 220 km de São Paulo, 
                  380 km do Rio de Janeiro e 400 km de Belo Horizonte favorece logística e agilidade em todo o território nacional.
                </p>
                <p>
                  Nossa linha de produtos inclui Autoclaves, Termodesinfectoras, Lavadoras Ultrassônicas, 
                  Reprocessadoras de Endoscópios, Secadoras de Traqueias e Pistolas de limpeza, 
                  todos desenvolvidos com foco em eficiência, sustentabilidade, segurança e alta performance.
                </p>
                <p>
                  Certificada com os mais exigentes selos de qualidade nacionais e internacionais (ISO 13485 e RDC 665), 
                  a Sanders se destaca por sua missão: <strong>preservar a vida dos pacientes e profissionais da área da saúde.</strong>
                </p>
              </div>
            </div>
            <div className="relative">
              {/* Bola de luz azul desfocada atrás */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full opacity-50 -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(96, 165, 250, 0.3) 40%, transparent 70%)',
                  filter: 'blur(50px)',
                  animation: 'pulse 4s ease-in-out infinite',
                }}
              />
              
              <div 
                className="relative overflow-hidden rounded-3xl p-10 text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(240, 249, 255, 0.9) 0%, rgba(219, 234, 254, 0.85) 100%)',
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  border: '1px solid rgba(147, 197, 253, 0.4)',
                  boxShadow: `
                    0 8px 32px rgba(59, 130, 246, 0.25),
                    0 0 0 1px rgba(255, 255, 255, 0.2) inset,
                    0 0 80px rgba(59, 130, 246, 0.2)
                  `,
                }}
              >
                {/* Reflexo de vidro superior */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, transparent 100%)',
                  }}
                />
                
                {/* Conteúdo */}
                <div className="space-y-8 relative z-10">
                  <div className="group">
                    <div 
                      className="text-5xl font-bold mb-2 bg-gradient-to-br from-sanders-blue via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-lg"
                      style={{
                        textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      23
                    </div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Anos de Experiência</div>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
                  
                  <div className="group">
                    <div 
                      className="text-5xl font-bold mb-2 bg-gradient-to-br from-sanders-blue via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-lg"
                      style={{
                        textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      5000+
                    </div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Clientes Atendidos</div>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
                  
                  <div className="group">
                    <div 
                      className="text-5xl font-bold mb-2 bg-gradient-to-br from-sanders-blue via-blue-500 to-blue-700 bg-clip-text text-transparent drop-shadow-lg"
                      style={{
                        textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      98%
                    </div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Satisfação dos Clientes</div>
                  </div>
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
              Estrategicamente localizada em Santa Rita do Sapucaí – MG, reconhecida como o Vale da Eletrônica, 
              facilitando logística e atendimento ágil em todo o território nacional.
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
                  Nossa missão é preservar a vida dos pacientes e profissionais da área da saúde 
                  através de equipamentos hospitalares de alta tecnologia e qualidade excepcional.
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