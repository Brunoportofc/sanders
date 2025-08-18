import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatModal from "@/components/ChatModal";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { produtos } from "@/data/produtos";
import { useChatContext } from "@/contexts/ChatContext";

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { isChatModalOpen, setIsChatModalOpen } = useChatContext();
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  // Dados dos produtos importados do arquivo centralizado

  const filteredProducts = produtos.filter(produto => {
    const matchesSearch = produto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || produto.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="bg-gradient-hero py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nossos Produtos
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Equipamentos hospitalares e odontológicos de alta qualidade, 
              desenvolvidos com tecnologia avançada e certificações internacionais.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Categoria:</span>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  <SelectItem value="hospitalares">Hospitalares</SelectItem>
                  <SelectItem value="odontologicos">Odontológicos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {filteredProducts.length} de {produtos.length} produtos
          </div>
        </div>
      </section>

      {/* Grade de Produtos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((produto) => (
              <Card key={produto.id} className="hover:shadow-card transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={produto.image}
                      alt={produto.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {produto.novo && (
                      <Badge className="absolute top-3 right-3 bg-sanders-success">
                        Novo
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {produto.category === "hospitalares" ? "Hospitalares" : "Odontológicos"}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{produto.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{produto.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {produto.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-sanders-blue rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-2xl font-bold text-sanders-blue mb-4">
                      {produto.price}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0 space-y-2">
                  <Button asChild className="w-full">
                    <Link to={`/produto-detalhes/${produto.id}`}>
                      Ver Detalhes
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedProduct(produto.name);
                      setIsChatModalOpen(true);
                    }}
                  >
                    Solicitar Cotação
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-muted-foreground">
                <p className="text-lg mb-2">Nenhum produto encontrado</p>
                <p className="text-sm">Tente ajustar os filtros de busca</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categorias em Destaque */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Categorias</h2>
            <p className="text-muted-foreground">
              Explore nossas principais linhas de produtos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden hover:shadow-card transition-shadow">
              <CardContent className="p-0">
                <div className="flex">
                  <img
                    src="/api/placeholder/200/150"
                    alt="Equipamentos Hospitalares"
                    className="w-1/3 object-cover"
                  />
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-semibold mb-2">Equipamentos Hospitalares</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Autoclaves, lavadoras ultrassônicas, estufas e equipamentos 
                      para centros cirúrgicos e CME.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSelectedCategory("hospitalares")}>
                      Ver Produtos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-card transition-shadow">
              <CardContent className="p-0">
                <div className="flex">
                  <img
                    src="/api/placeholder/200/150"
                    alt="Equipamentos Odontológicos"
                    className="w-1/3 object-cover"
                  />
                  <div className="p-6 flex-1">
                    <h3 className="text-xl font-semibold mb-2">Equipamentos Odontológicos</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Autoclaves compactas, fotopolimerizadores e equipamentos 
                      especializados para consultórios odontológicos.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSelectedCategory("odontologicos")}>
                      Ver Produtos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Chat Modal */}
      <ChatModal 
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        productName={selectedProduct}
      />
    </div>
  );
};

export default Produtos;