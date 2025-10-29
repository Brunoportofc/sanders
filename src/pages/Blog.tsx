import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Clock, User, ArrowRight } from "lucide-react";
import { useState } from "react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const posts = [
    {
      id: 1,
      title: "Esterilização em Baixa Temperatura: Vantagens e Aplicações",
      excerpt: "Descubra como a esterilização em baixa temperatura revoluciona o processamento de instrumentos sensíveis ao calor, oferecendo segurança e eficiência para materiais termolábeis.",
      image: "/api/placeholder/400/250",
      category: "Tecnologia",
      author: "Dr. Carlos Silva",
      date: "15 de Dezembro, 2024",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Rastreabilidade nos Processos de Esterilização Hospitalar",
      excerpt: "A importância da rastreabilidade na esterilização hospitalar para garantir a segurança dos pacientes e conformidade com normas regulamentares.",
      image: "/api/placeholder/400/250",
      category: "Qualidade",
      author: "Enfª Maria Santos",
      date: "10 de Dezembro, 2024",
      readTime: "7 min"
    },
    {
      id: 3,
      title: "Manutenção Preventiva em Equipamentos de Esterilização",
      excerpt: "Como implementar um programa eficaz de manutenção preventiva para garantir o funcionamento contínuo e prolongar a vida útil dos equipamentos.",
      image: "/api/placeholder/400/250",
      category: "Manutenção",
      author: "Eng. João Oliveira",
      date: "5 de Dezembro, 2024",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Normas ANVISA para Equipamentos Médicos: Guia Completo",
      excerpt: "Entenda as principais normas da ANVISA para equipamentos médicos e como garantir conformidade regulatória em sua instituição.",
      image: "/api/placeholder/400/250",
      category: "Regulamentação",
      author: "Dr. Ana Costa",
      date: "28 de Novembro, 2024",
      readTime: "8 min"
    },
    {
      id: 5,
      title: "Sustentabilidade na Área da Saúde: Equipamentos Eco-friendly",
      excerpt: "Como escolher equipamentos médicos sustentáveis e implementar práticas eco-friendly no ambiente hospitalar.",
      image: "/api/placeholder/400/250",
      category: "Sustentabilidade",
      author: "Dra. Laura Mendes",
      date: "20 de Novembro, 2024",
      readTime: "4 min"
    },
    {
      id: 6,
      title: "Inovações em Autoclaves: Tecnologia e Eficiência",
      excerpt: "As mais recentes inovações tecnológicas em autoclaves, incluindo controles inteligentes e sistemas de monitoramento remoto.",
      image: "/api/placeholder/400/250",
      category: "Inovação",
      author: "Eng. Roberto Lima",
      date: "15 de Novembro, 2024",
      readTime: "6 min"
    }
  ];

  const categories = ["Todos", "Tecnologia", "Qualidade", "Manutenção", "Regulamentação", "Sustentabilidade", "Inovação"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-12 sm:py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Blog Sanders
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed">
              Conhecimento especializado em equipamentos médicos, dicas de manutenção, 
              novidades tecnológicas e tendências da área da saúde.
            </p>
          </div>
        </div>
      </section>

      {/* Post em Destaque */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Post em Destaque</h2>
            <Card className="overflow-hidden max-w-4xl mx-auto hover:shadow-card transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4">{featuredPost.category}</Badge>
                  <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{featuredPost.author}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="mr-4">{featuredPost.readTime}</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  
                  <Button>
                    Ler Artigo Completo
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Filtros e Busca */}
      <section className="py-8 border-y bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Artigos Recentes</h2>
            <p className="text-muted-foreground">
              Mostrando {filteredPosts.length} de {posts.length} artigos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-card transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6">
                    <Badge variant="outline" className="mb-3">{post.category}</Badge>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      <span className="mr-3">{post.author}</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="mr-3">{post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button variant="outline" className="w-full">
                    Ler Mais
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-muted-foreground">
                <p className="text-lg mb-2">Nenhum artigo encontrado</p>
                <p className="text-sm">Tente ajustar os filtros de busca</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-sanders-blue-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Receba Nossas Novidades</h2>
            <p className="text-muted-foreground mb-8">
              Assine nossa newsletter e receba artigos exclusivos, dicas técnicas 
              e novidades sobre equipamentos médicos diretamente em seu e-mail.
            </p>
            
            <div className="flex gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1"
              />
              <Button>
                Assinar
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Enviamos apenas conteúdo relevante. Cancele a qualquer momento.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;