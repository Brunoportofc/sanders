import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThreeDViewer from "@/components/ThreeDViewer";
import InlineThreeDViewer from "@/components/InlineThreeDViewer";
import HeroMetaballsBackground from "@/components/HeroMetaballsBackground";
import HeroNetworkBackground from "@/components/HeroNetworkBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Leaf, Settings, Award, Users, ArrowRight, Star, Quote, Eye } from "lucide-react";

const Index = () => {
  const [is3DViewerActive, setIs3DViewerActive] = useState(true);
  // Tema agora é controlado pelo ThemeProvider (next-themes)
  const produtosDestaque = [
    {
      id: "autoclave-horizontal-200l",
      name: "Autoclave Horizontal 200L",
      price: "R$ 25.000",
      image: "/api/placeholder/300/200",
      description: "Esterilização segura para grandes volumes"
    },
    {
      id: "lavadora-ultrassonica-40l", 
      name: "Lavadora Ultrassônica 40L",
      price: "R$ 18.000",
      image: "/api/placeholder/300/200",
      description: "Limpeza profunda de instrumentos"
    },
    {
      id: "autoclave-odonto-12l",
      name: "Autoclave Odontológica 12L", 
      price: "R$ 4.500",
      image: "/api/placeholder/300/200",
      description: "Compacta para consultórios"
    }
  ];

  const depoimentos = [
    {
      nome: "Dr. Carlos Santos",
      empresa: "Hospital São Lucas",
      texto: "Equipamentos Sanders há 5 anos. Qualidade excepcional e suporte técnico incomparável.",
      rating: 5
    },
    {
      nome: "Enfª Maria Silva", 
      empresa: "Clínica Santa Helena",
      texto: "Excelente pós-venda. Os técnicos são muito capacitados e sempre resolvem rapidamente.",
      rating: 5
    },
    {
      nome: "Dr. João Oliveira",
      empresa: "Consultório Odonto+",
      texto: "Autoclave compacta perfeita para meu consultório. Recomendo a Sanders!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background tech-page">
      <Header />
      
      {/* Hero Banner */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Animated network background (points + lines) */}
        <HeroNetworkBackground />
        {/* Blue orbs for subtle tech depth (ligadas à cor do tema) */}
        <div className="tech-orb tech-orb--tl z-[4]" />
        <div className="tech-orb tech-orb--br z-[4]" />
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden z-[3]">
          <div className="absolute top-20 left-10 w-32 h-32 bg-sanders-blue-glow/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-sanders-ocean/15 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-sanders-blue-glow/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-up text-foreground">
              <Badge variant="secondary" className="bg-sanders-blue-light text-sanders-blue backdrop-blur-sm animate-scale-up">
                <Award className="h-4 w-4 mr-2" />
                +30 anos de experiência
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Equipamentos Hospitalares de 
                <span className="heading-blue-gradient block mt-2">Excelência</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Soluções completas em esterilização e equipamentos médicos 
                com certificações ANVISA e ISO 13485.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="default" className="hover-lift animate-glow-pulse" asChild>
                  <Link to="/produtos">
                    Ver Produtos
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                {/* Botão do viewer removido: viewer agora inicia sempre ativo na hero */}
              </div>
            </div>
            <div className="animate-scale-up viewer-transition" style={{animationDelay: '0.3s'}}>
              <div className="aspect-video relative">
                <InlineThreeDViewer isActive={is3DViewerActive} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <Badge variant="outline" className="mb-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              Nossos Diferenciais
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
              Por que Escolher a Sanders?
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Mais de 30 anos de inovação e excelência no mercado de equipamentos médicos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center glass-effect hover-lift group animate-scale-up border-0">
              <CardContent className="p-8">
                <div className="h-20 w-20 bg-gradient-to-br from-sanders-success to-sanders-success/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow-pulse shadow-glow">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">Sustentabilidade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Equipamentos eco-friendly com baixo consumo de energia e água
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center glass-effect hover-lift group animate-scale-up border-0" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-8">
                <div className="h-20 w-20 bg-gradient-to-br from-sanders-blue to-sanders-blue-dark rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow-pulse shadow-glow">
                  <Settings className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">Automação</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Controles digitais avançados com monitoramento inteligente
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center glass-effect hover-lift group animate-scale-up border-0" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-8">
                <div className="h-20 w-20 bg-gradient-to-br from-sanders-ocean to-sanders-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow-pulse shadow-glow">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">Certificações</h3>
                <p className="text-muted-foreground leading-relaxed">
                  ISO 13485, ANVISA e conformidade com normas internacionais
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center glass-effect hover-lift group animate-scale-up border-0" style={{animationDelay: '0.3s'}}>
              <CardContent className="p-8">
                <div className="h-20 w-20 bg-gradient-to-br from-sanders-blue to-sanders-success rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow-pulse shadow-glow">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">Pós-venda</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Suporte técnico especializado e garantia estendida
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-20 bg-gradient-pearl relative overflow-hidden">
        <div className="absolute inset-0 bg-sanders-blue-light/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <Badge variant="outline" className="mb-4">
              <Settings className="h-4 w-4 mr-2" />
              Linha Premium
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
              Produtos em Destaque
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Conheça nossa linha premium de equipamentos com tecnologia de ponta
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {produtosDestaque.map((produto, index) => (
              <Card key={produto.id} className="glass-effect hover-lift group border-0 overflow-hidden animate-scale-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={produto.image}
                      alt={produto.name}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sanders-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-sanders-blue transition-colors">{produto.name}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{produto.description}</p>
                    <div className="text-3xl font-bold gradient-text mb-6">{produto.price}</div>
                    <Button asChild className="w-full hover-lift animate-glow-pulse">
                      <Link to={`/produto/${produto.id}`}>
                        Ver Detalhes
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16 animate-fade-up" style={{animationDelay: '0.4s'}}>
            <Button size="lg" variant="outline" className="glass-effect hover-lift" asChild>
              <Link to="/produtos">
                Ver Todos os Produtos
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <Badge variant="outline" className="mb-4">
              <Users className="h-4 w-4 mr-2" />
              Depoimentos
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
              Histórias de Sucesso
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Depoimentos reais de profissionais que confiam na Sanders do Brasil
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <Card key={index} className="glass-effect hover-lift group border-0 animate-scale-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-8 relative">
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Quote className="h-12 w-12 text-sanders-blue" />
                  </div>
                  <div className="flex items-center mb-6">
                    {[...Array(depoimento.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-sanders-blue text-sanders-blue mr-1" />
                    ))}
                  </div>
                  <p className="text-foreground mb-8 italic text-lg leading-relaxed group-hover:text-sanders-blue/80 transition-colors">"{depoimento.texto}"</p>
                  <div className="border-t border-border/20 pt-6">
                    <p className="font-bold text-lg">{depoimento.nome}</p>
                    <p className="text-sanders-blue font-medium">{depoimento.empresa}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-hero-glow text-white relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-40 h-40 bg-sanders-blue-glow/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-sanders-ocean/40 rounded-full blur-2xl animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-sanders-blue-glow/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              Transforme sua Instituição
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
              Pronto para Modernizar seus 
              <span className="block gradient-text">Equipamentos?</span>
            </h2>
            <p className="text-xl opacity-90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Entre em contato conosco e descubra como podemos ajudar sua instituição 
              com soluções personalizadas em equipamentos médicos de última geração.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {/* Botão temporariamente removido */}
              {/* <Button size="lg" variant="secondary" className="hover-lift animate-glow-pulse" asChild>
                <Link to="/quero-comprar">
                  Solicitar Cotação
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button> */}
              {/* Botão temporariamente removido */}
              {/* <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sanders-blue hover-lift glass-effect" asChild>
                <Link to="/contato">
                  Falar com Especialista
                  <Users className="h-5 w-5 ml-2" />
                </Link>
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;