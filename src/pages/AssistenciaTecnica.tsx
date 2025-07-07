import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Wrench, Clock, CheckCircle, Phone, Mail, Calendar, Upload } from "lucide-react";

const AssistenciaTecnica = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Wrench className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Assistência Técnica
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Suporte especializado e manutenção preventiva para garantir 
              o funcionamento perfeito dos seus equipamentos Sanders.
            </p>
          </div>
        </div>
      </section>

      {/* Tipos de Serviço */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos suporte completo com equipe técnica especializada e peças originais
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-card transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Manutenção Corretiva</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Reparo de equipamentos com defeito ou funcionamento inadequado
                </p>
                <Badge variant="outline">Emergencial</Badge>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-sanders-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Manutenção Preventiva</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Programação regular para evitar falhas e prolongar vida útil
                </p>
                <Badge variant="outline">Programada</Badge>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Calibração</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Calibração e certificação de acordo com normas técnicas
                </p>
                <Badge variant="outline">Certificada</Badge>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Suporte Remoto</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Diagnóstico e orientação técnica por telefone/vídeo
                </p>
                <Badge variant="outline">24h</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SLA e Garantias */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Compromissos</h2>
            <p className="text-muted-foreground">
              Prazos e garantias que você pode confiar
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-sanders-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Atendimento Rápido</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Emergência:</span>
                    <span className="font-medium">4 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgente:</span>
                    <span className="font-medium">24 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Normal:</span>
                    <span className="font-medium">48 horas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-sanders-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Garantia Estendida</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Equipamentos novos:</span>
                    <span className="font-medium">2-3 anos</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Serviços realizados:</span>
                    <span className="font-medium">90 dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peças originais:</span>
                    <span className="font-medium">12 meses</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8 text-center">
                <Wrench className="h-12 w-12 text-sanders-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Cobertura Nacional</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sudeste:</span>
                    <span className="font-medium">Presencial</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outras regiões:</span>
                    <span className="font-medium">Parceiros</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Suporte remoto:</span>
                    <span className="font-medium">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulário de Solicitação */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Solicitar Assistência</h2>
              <p className="text-muted-foreground">
                Preencha o formulário e nossa equipe técnica entrará em contato
              </p>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <form className="space-y-8">
                  {/* Tipo de Solicitação */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tipo de Solicitação</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tipo de Serviço *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o serviço" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corretiva">Manutenção Corretiva</SelectItem>
                            <SelectItem value="preventiva">Manutenção Preventiva</SelectItem>
                            <SelectItem value="calibracao">Calibração</SelectItem>
                            <SelectItem value="instalacao">Instalação</SelectItem>
                            <SelectItem value="treinamento">Treinamento</SelectItem>
                            <SelectItem value="consultoria">Consultoria Técnica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Urgência *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a urgência" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="emergencia">Emergência (4h)</SelectItem>
                            <SelectItem value="urgente">Urgente (24h)</SelectItem>
                            <SelectItem value="normal">Normal (48h)</SelectItem>
                            <SelectItem value="programada">Programada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Dados de Contato */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dados de Contato</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nome Completo *</label>
                        <Input placeholder="Seu nome completo" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Cargo/Função</label>
                        <Input placeholder="Ex: Responsável Técnico, Enfermeiro..." />
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
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Melhor Horário para Contato</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o horário" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manha">Manhã (8h-12h)</SelectItem>
                            <SelectItem value="tarde">Tarde (13h-17h)</SelectItem>
                            <SelectItem value="comercial">Horário Comercial</SelectItem>
                            <SelectItem value="qualquer">Qualquer horário</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Dados da Instituição */}
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
                        <label className="text-sm font-medium">Endereço Completo *</label>
                        <Input placeholder="Rua, número, bairro" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Cidade/Estado *</label>
                        <Input placeholder="Cidade - UF" />
                      </div>
                    </div>
                  </div>

                  {/* Informações do Equipamento */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Informações do Equipamento</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tipo de Equipamento *</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o equipamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="autoclave-horizontal">Autoclave Horizontal</SelectItem>
                            <SelectItem value="autoclave-vertical">Autoclave Vertical</SelectItem>
                            <SelectItem value="autoclave-odonto">Autoclave Odontológica</SelectItem>
                            <SelectItem value="lavadora">Lavadora Ultrassônica</SelectItem>
                            <SelectItem value="estufa">Estufa de Secagem</SelectItem>
                            <SelectItem value="seladora">Seladora</SelectItem>
                            <SelectItem value="fotopolimerizador">Fotopolimerizador</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Modelo *</label>
                        <Input placeholder="Ex: SA-200H, SA-12L..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Número de Série</label>
                        <Input placeholder="Número de série do equipamento" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Ano de Fabricação</label>
                        <Input placeholder="Ex: 2020" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Data da Última Manutenção</label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Equipamento em Garantia?</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sim">Sim</SelectItem>
                            <SelectItem value="nao">Não</SelectItem>
                            <SelectItem value="nao-sei">Não sei</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Descrição do Problema */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Descrição do Problema/Solicitação</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Descrição Detalhada *</label>
                        <Textarea 
                          placeholder="Descreva o problema, sintomas observados, códigos de erro (se houver), quando o problema começou..."
                          className="min-h-32"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Sintomas Observados (marque todos que se aplicam)</label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            "Equipamento não liga",
                            "Não aquece adequadamente",
                            "Vazamento de vapor",
                            "Alarme sonoro constante",
                            "Display com erro",
                            "Porta não fecha/veda",
                            "Ciclo não completa",
                            "Pressão inadequada"
                          ].map((sintoma) => (
                            <div key={sintoma} className="flex items-center space-x-2">
                              <Checkbox id={sintoma} />
                              <label htmlFor={sintoma} className="text-sm">{sintoma}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Anexar Fotos/Documentos</label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Clique para enviar fotos do equipamento, códigos de erro ou documentos relevantes
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Formatos aceitos: JPG, PNG, PDF (máx. 10MB)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Autorização */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="autorizacao" />
                      <label htmlFor="autorizacao" className="text-sm text-muted-foreground">
                        Autorizo a Sanders do Brasil a entrar em contato para diagnóstico e orçamento do serviço *
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox id="emergencia" />
                      <label htmlFor="emergencia" className="text-sm text-muted-foreground">
                        Em caso de emergência, autorizo contato fora do horário comercial
                      </label>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button size="lg" className="flex-1">
                      <Wrench className="h-4 w-4 mr-2" />
                      Solicitar Assistência
                    </Button>
                    <Button variant="outline" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Ligar Agora
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contatos de Emergência */}
      <section className="py-16 bg-sanders-blue-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Contatos de Emergência</h2>
            <p className="text-muted-foreground">
              Para situações urgentes, entre em contato diretamente
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-sanders-blue mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Suporte 24h</h3>
                <p className="text-sm text-muted-foreground mb-3">(35) 3471-9001</p>
                <Badge variant="destructive">Emergência</Badge>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-sanders-blue mx-auto mb-3" />
                <h3 className="font-semibold mb-2">WhatsApp Técnico</h3>
                <p className="text-sm text-muted-foreground mb-3">(35) 9 9999-0001</p>
                <Badge>Online</Badge>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-sanders-blue mx-auto mb-3" />
                <h3 className="font-semibold mb-2">E-mail Técnico</h3>
                <p className="text-sm text-muted-foreground mb-3">suporte@sandersdobrasil.com.br</p>
                <Badge variant="outline">48h</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AssistenciaTecnica;