import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatModal from "@/components/ChatModal";
import InlineThreeDViewer from "@/components/InlineThreeDViewer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Star, Shield, Truck, HeadphonesIcon } from "lucide-react";
import { getProdutoById } from "@/data/produtos";
import { useChatContext } from "@/contexts/ChatContext";

const ProdutoDetalhesIndividual = () => {
  const { id } = useParams<{ id: string }>();
  const { isChatModalOpen, setIsChatModalOpen } = useChatContext();
  const [selectedImage, setSelectedImage] = useState(0);

  const produto = id ? getProdutoById(id) : null;

  if (!produto) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-8">O produto que você está procurando não existe ou foi removido.</p>
          <Button asChild>
            <Link to="/produtos">Voltar aos Produtos</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <section className="py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Início</Link>
            <span>/</span>
            <Link to="/produtos" className="hover:text-foreground">Produtos</Link>
            <span>/</span>
            <span className="text-foreground">{produto.name}</span>
          </div>
        </div>
      </section>

      {/* Produto Principal */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            asChild 
            className="mb-8 -ml-4"
          >
            <Link to="/produtos">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Produtos
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Galeria de Imagens */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                {produto.gallery?.[selectedImage]?.endsWith('.glb') ? (
                  <div className="w-full h-full">
                    <InlineThreeDViewer isActive={true} />
                  </div>
                ) : (
                  <img
                    src={produto.gallery?.[selectedImage] || produto.image}
                    alt={produto.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {produto.gallery && produto.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {produto.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-md overflow-hidden border-2 transition-colors relative ${
                        selectedImage === index ? 'border-sanders-blue' : 'border-transparent'
                      }`}
                    >
                      {image.endsWith('.glb') ? (
                        <div className="w-full h-full bg-gradient-to-br from-sanders-blue/20 to-sanders-blue/40 flex items-center justify-center">
                          <div className="text-sanders-blue font-semibold text-xs text-center">
                            <div className="mb-1">🎯</div>
                            <div>3D</div>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={image}
                          alt={`${produto.name} - Imagem ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">
                    {produto.category === "hospitalares" ? "Hospitalares" : "Odontológicos"}
                  </Badge>
                  {produto.novo && (
                    <Badge className="bg-sanders-success">Novo</Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold mb-4">{produto.name}</h1>
                <p className="text-lg text-muted-foreground mb-6">{produto.description}</p>
              </div>

              <div className="text-4xl font-bold text-sanders-blue mb-6">
                {produto.price}
              </div>

              {/* Características Principais */}
              <div className="space-y-3">
                <h3 className="font-semibold">Características Principais:</h3>
                <div className="grid gap-2">
                  {produto.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-sanders-success mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-3 pt-6">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => setIsChatModalOpen(true)}
                >
                  Solicitar Cotação
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/contato">Falar com Especialista</Link>
                </Button>
              </div>

              {/* Garantias e Benefícios */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-center text-sm">
                  <Shield className="h-4 w-4 text-sanders-blue mr-2" />
                  <span>Garantia de 2 anos</span>
                </div>
                <div className="flex items-center text-sm">
                  <Truck className="h-4 w-4 text-sanders-blue mr-2" />
                  <span>Frete grátis</span>
                </div>
                <div className="flex items-center text-sm">
                  <HeadphonesIcon className="h-4 w-4 text-sanders-blue mr-2" />
                  <span>Suporte técnico</span>
                </div>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-sanders-blue mr-2" />
                  <span>Certificação ANVISA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detalhes em Abas */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
              <TabsTrigger value="benefits">Benefícios</TabsTrigger>
              <TabsTrigger value="applications">Aplicações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Descrição Detalhada</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {produto.detailedDescription}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Especificações Técnicas</h3>
                  {produto.specifications && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(produto.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-border">
                          <span className="font-medium">{key}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Benefícios</h3>
                  {produto.benefits && (
                    <div className="grid md:grid-cols-2 gap-3">
                      {produto.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-sanders-success mr-2 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="applications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Aplicações</h3>
                  {produto.applications && (
                    <div className="grid md:grid-cols-2 gap-3">
                      {produto.applications.map((application, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-sanders-blue rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-sm">{application}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
      
      {/* Chat Modal */}
      <ChatModal 
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        productName={produto.name}
      />
    </div>
  );
};

export default ProdutoDetalhesIndividual;