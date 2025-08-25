import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatModal from "@/components/ChatModal";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, ShoppingCart, Eye } from "lucide-react";
import { produtos } from "@/data/produtos";
import { useChatContext } from "@/contexts/ChatContext";

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const { isChatModalOpen, setIsChatModalOpen } = useChatContext();
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  // Dados dos produtos importados do arquivo centralizado

  const filteredProducts = produtos.filter(produto => {
    const matchesSearch = produto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    
    if (selectedSubcategory !== "all") {
      switch (selectedSubcategory) {
        case "autoclaves":
          matchesCategory = produto.category === "hospitalares" && produto.name.toLowerCase().includes("autoclave");
          break;
        case "lavadoras":
          matchesCategory = produto.category === "hospitalares" && produto.name.toLowerCase().includes("lavadora");
          break;
        case "setadoras":
          matchesCategory = produto.category === "hospitalares" && (produto.name.toLowerCase().includes("secagem") || produto.name.toLowerCase().includes("setadora"));
          break;
        case "termodesinfetoras":
          matchesCategory = produto.category === "odontologicos" && produto.name.toLowerCase().includes("termodesinfetora");
          break;
        case "estufas":
          matchesCategory = produto.category === "odontologicos" && produto.name.toLowerCase().includes("estufa");
          break;
        default:
          matchesCategory = selectedCategory === "all" || produto.category === selectedCategory;
      }
    } else {
      matchesCategory = selectedCategory === "all" || produto.category === selectedCategory;
    }
    
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

      {/* Área de Pesquisa e Menu Categorizado */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Barra de Pesquisa */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-primary rounded-xl shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Menu de Categorias */}
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Categorias de Produtos</h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                 variant={selectedSubcategory === "all" ? "default" : "outline"}
                 onClick={() => {
                   setSelectedCategory("all")
                   setSelectedSubcategory("all")
                 }}
                 className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                   selectedSubcategory === "all" 
                     ? "bg-primary text-white shadow-lg scale-105" 
                     : "bg-background text-foreground border-2 border-border hover:border-primary hover:text-primary hover:scale-105"
                 }`}
               >
                 Todos
                 <Badge variant="secondary" className="ml-2">
                   {produtos.length}
                 </Badge>
               </Button>
               
               <Button
                 variant={selectedSubcategory === "autoclaves" ? "default" : "outline"}
                 onClick={() => {
                   setSelectedCategory("hospitalares")
                   setSelectedSubcategory("autoclaves")
                 }}
                 className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                   selectedSubcategory === "autoclaves" 
                     ? "bg-primary text-white shadow-lg scale-105" 
                     : "bg-background text-foreground border-2 border-border hover:border-primary hover:text-primary hover:scale-105"
                 }`}
               >
                 Autoclaves
                 <Badge variant="secondary" className="ml-2">
                   {produtos.filter(p => p.category === "hospitalares" && p.name.toLowerCase().includes("autoclave")).length}
                 </Badge>
               </Button>
               
               <Button
                 variant={selectedSubcategory === "lavadoras" ? "default" : "outline"}
                 onClick={() => {
                   setSelectedCategory("hospitalares")
                   setSelectedSubcategory("lavadoras")
                 }}
                 className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                   selectedSubcategory === "lavadoras" 
                     ? "bg-primary text-white shadow-lg scale-105" 
                     : "bg-background text-foreground border-2 border-border hover:border-primary hover:text-primary hover:scale-105"
                 }`}
               >
                 Lavadoras
                 <Badge variant="secondary" className="ml-2">
                   {produtos.filter(p => p.category === "hospitalares" && p.name.toLowerCase().includes("lavadora")).length}
                 </Badge>
               </Button>
               
               <Button
                 variant={selectedSubcategory === "setadoras" ? "default" : "outline"}
                 onClick={() => {
                   setSelectedCategory("hospitalares")
                   setSelectedSubcategory("setadoras")
                 }}
                 className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                   selectedSubcategory === "setadoras" 
                     ? "bg-primary text-white shadow-lg scale-105" 
                     : "bg-background text-foreground border-2 border-border hover:border-primary hover:text-primary hover:scale-105"
                 }`}
               >
                 Setadoras
                 <Badge variant="secondary" className="ml-2">
                   {produtos.filter(p => p.category === "hospitalares" && (p.name.toLowerCase().includes("secagem") || p.name.toLowerCase().includes("setadora"))).length}
                 </Badge>
               </Button>
               
               <Button
                 variant={selectedSubcategory === "termodesinfetoras" ? "default" : "outline"}
                 onClick={() => {
                   setSelectedCategory("odontologicos")
                   setSelectedSubcategory("termodesinfetoras")
                 }}
                 className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                   selectedSubcategory === "termodesinfetoras" 
                     ? "bg-primary text-white shadow-lg scale-105" 
                     : "bg-background text-foreground border-2 border-border hover:border-primary hover:text-primary hover:scale-105"
                 }`}
               >
                 Termodesinfetoras
                 <Badge variant="secondary" className="ml-2">
                   {produtos.filter(p => p.category === "odontologicos" && p.name.toLowerCase().includes("termodesinfetora")).length}
                 </Badge>
               </Button>
               
               <Button
                 variant={selectedSubcategory === "estufas" ? "default" : "outline"}
                 onClick={() => {
                   setSelectedCategory("odontologicos")
                   setSelectedSubcategory("estufas")
                 }}
                 className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                   selectedSubcategory === "estufas" 
                     ? "bg-primary text-white shadow-lg scale-105" 
                     : "bg-background text-foreground border-2 border-border hover:border-primary hover:text-primary hover:scale-105"
                 }`}
               >
                 Estufas
                 <Badge variant="secondary" className="ml-2">
                   {produtos.filter(p => p.category === "odontologicos" && p.name.toLowerCase().includes("estufa")).length}
                 </Badge>
               </Button>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
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