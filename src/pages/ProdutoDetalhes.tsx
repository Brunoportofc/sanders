import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatModal from "@/components/ChatModal";
import InlineThreeDViewer from "@/components/InlineThreeDViewer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Download, Phone, Mail, ArrowLeft } from "lucide-react";
import { useChatContext } from "@/contexts/ChatContext";
import { getProdutoById } from "@/data/produtos";

const ProdutoDetalhes = () => {
  const { id } = useParams();
  const { isChatModalOpen, setIsChatModalOpen } = useChatContext();

  const produto = getProdutoById(id || "");

  if (!produto) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Button asChild>
            <Link to="/produtos">Voltar aos Produtos</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const downloads = [
    { name: "Manual do Usuário", url: "#" },
    { name: "Ficha Técnica", url: "#" },
    { name: "Certificados", url: "#" },
    { name: "Catálogo", url: "#" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span>Home</span> / <span>Produtos</span> / <span>{produto.category === "hospitalares" ? "Hospitalares" : "Odontológicos"}</span> / <span className="text-foreground">{produto.name}</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/produtos">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar aos Produtos
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Produto Principal */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Galeria de Imagens */}
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-gradient-to-br from-sanders-blue-light/20 to-sanders-blue/10 rounded-lg overflow-hidden relative">
                {produto.gallery?.[0]?.endsWith('.glb') ? (
                  <div className="h-full w-full viewer-3d-container">
                    <InlineThreeDViewer isActive={true} />
                  </div>
                ) : (
                  <img
                    src={produto.gallery?.[0] || produto.image}
                    alt={produto.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {produto.gallery && produto.gallery.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {produto.gallery.slice(1).map((image, index) => (
                    <div key={index} className="aspect-square bg-sanders-blue-light rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                      <img
                        src={image}
                        alt={`${produto.name} - Imagem ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2">{produto.category === "hospitalares" ? "Hospitalares" : "Odontológicos"}</Badge>
                <h1 className="text-3xl font-bold mb-4">{produto.name}</h1>
                <p className="text-muted-foreground text-lg">{produto.detailedDescription || produto.description}</p>
              </div>

              <div className="text-3xl font-bold text-sanders-blue">
                {produto.price}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Principais Características:</h3>
                <div className="grid gap-2">
                  {produto.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-sanders-success" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => setIsChatModalOpen(true)}
                >
                  Solicitar Cotação
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar Agora
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar E-mail
                  </Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-sanders-success" />
                    <span>Garantia de 2 anos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-sanders-success" />
                    <span>Suporte técnico</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-sanders-success" />
                    <span>Peças originais</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs de Informações */}
      <section className="py-16 border-t bg-muted">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
              <TabsTrigger value="features">Características</TabsTrigger>
              <TabsTrigger value="applications">Aplicações</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Especificações Técnicas</h3>
                  {produto.specifications ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(produto.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b">
                          <span className="font-medium">{key}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Especificações técnicas não disponíveis.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Características Completas</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {produto.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-sanders-success mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="applications" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Aplicações Recomendadas</h3>
                  {produto.applications ? (
                    <div className="grid md:grid-cols-3 gap-4">
                      {produto.applications.map((application, index) => (
                        <div key={index} className="bg-sanders-blue-light p-4 rounded-lg text-center">
                          <span className="font-medium">{application}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Aplicações não especificadas.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="downloads" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Downloads Disponíveis</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {downloads.map((download, index) => (
                      <Button key={index} variant="outline" className="justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        {download.name}
                      </Button>
                    ))}
                  </div>
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

export default ProdutoDetalhes;