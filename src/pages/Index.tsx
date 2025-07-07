import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Leaf, Settings, Award, Users, ArrowRight, Star, Quote } from "lucide-react";

const Index = () => {
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
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-white/20 text-white">
                +30 anos de experiência
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Equipamentos Hospitalares de 
                <span className="text-sanders-blue-light"> Excelência</span>
              </h1>
              <p className="text-xl opacity-90">
                Soluções completas em esterilização e equipamentos médicos 
                com certificações ANVISA e ISO 13485.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/produtos">Ver Produtos</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sanders-blue" asChild>
                  <Link to="/quero-comprar">Solicitar Cotação</Link>
                </Button>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="aspect-video bg-sanders-blue-light rounded-lg flex items-center justify-center">
                <div className="text-center text-sanders-blue">
                  <Settings className="h-16 w-16 mx-auto mb-4" />
                  <p className="font-semibold">Equipamentos Sanders</p>
                  <p className="text-sm">Tecnologia e Qualidade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Diferenciais</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Por que milhares de profissionais da saúde confiam na Sanders do Brasil
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-card transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-sanders-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Sustentabilidade</h3>
                <p className="text-sm text-muted-foreground">
                  Equipamentos eco-friendly com baixo consumo de energia e água
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Automação</h3>
                <p className="text-sm text-muted-foreground">
                  Controles digitais avançados com monitoramento inteligente
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-sanders-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Certificações</h3>
                <p className="text-sm text-muted-foreground">
                  ISO 13485, ANVISA e conformidade com normas internacionais
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card transition-shadow">
              <CardContent className="p-8">
                <div className="h-16 w-16 bg-sanders-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Pós-venda</h3>
                <p className="text-sm text-muted-foreground">
                  Suporte técnico especializado e garantia estendida
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Produtos em Destaque</h2>
            <p className="text-muted-foreground">
              Conheça nossa linha premium de equipamentos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {produtosDestaque.map((produto) => (
              <Card key={produto.id} className="hover:shadow-card transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={produto.image}
                    alt={produto.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{produto.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{produto.description}</p>
                    <div className="text-2xl font-bold text-sanders-blue mb-4">{produto.price}</div>
                    <Button asChild className="w-full">
                      <Link to={`/produto/${produto.id}`}>Ver Detalhes</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/produtos">
                Ver Todos os Produtos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O que Nossos Clientes Dizem</h2>
            <p className="text-muted-foreground">
              Depoimentos reais de profissionais que confiam na Sanders
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <Card key={index} className="hover:shadow-card transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(depoimento.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-sanders-blue mb-4" />
                  <p className="text-muted-foreground mb-6 italic">"{depoimento.texto}"</p>
                  <div>
                    <p className="font-semibold">{depoimento.nome}</p>
                    <p className="text-sm text-muted-foreground">{depoimento.empresa}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-sanders-blue text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para Modernizar seus Equipamentos?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Entre em contato conosco e descubra como podemos ajudar sua instituição 
              com soluções personalizadas em equipamentos médicos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/quero-comprar">Solicitar Cotação</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sanders-blue" asChild>
                <Link to="/contato">Falar com Especialista</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;