import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Download, Phone, Mail } from "lucide-react";

const ProdutoDetalhes = () => {
  const { id } = useParams();

  // Mock data - em produção viria de uma API
  const produto = {
    id: "autoclave-horizontal-200l",
    name: "Autoclave Horizontal 200L",
    category: "Hospitalares",
    price: "R$ 25.000",
    images: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
    description: "Autoclave horizontal de grande capacidade, ideal para hospitais e clínicas que necessitam de esterilização em grande escala. Equipada com tecnologia avançada e controles digitais para máxima segurança e eficiência.",
    features: [
      "Capacidade de 200 litros",
      "Controle digital com display touchscreen",
      "Registro automático de dados",
      "Validação de processos",
      "Porta dupla opcional",
      "Sistema de vácuo pulsante",
      "Construção em aço inoxidável AISI 316L",
      "Conformidade com normas ISO e ANVISA"
    ],
    specifications: {
      "Dimensões": "180 x 80 x 120 cm",
      "Peso": "450 kg",
      "Voltagem": "220V / 380V",
      "Potência": "12 kW",
      "Temperatura": "121°C a 134°C",
      "Pressão": "1,5 a 2,2 bar",
      "Capacidade": "200 litros",
      "Material": "Aço inoxidável AISI 316L"
    },
    applications: [
      "Hospitais",
      "Clínicas",
      "Centros cirúrgicos",
      "CME (Central de Material Esterilizado)",
      "Laboratórios",
      "Indústria farmacêutica"
    ],
    downloads: [
      { name: "Manual do Usuário", url: "#" },
      { name: "Ficha Técnica", url: "#" },
      { name: "Certificados", url: "#" },
      { name: "Catálogo", url: "#" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-muted-foreground">
            <span>Home</span> / <span>Produtos</span> / <span>Hospitalares</span> / <span className="text-foreground">{produto.name}</span>
          </div>
        </div>
      </div>

      {/* Produto Principal */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Galeria de Imagens */}
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-sanders-blue-light rounded-lg overflow-hidden">
                <img
                  src={produto.images[0]}
                  alt={produto.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {produto.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square bg-sanders-blue-light rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <img
                      src={image}
                      alt={`${produto.name} - Imagem ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Informações do Produto */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2">{produto.category}</Badge>
                <h1 className="text-3xl font-bold mb-4">{produto.name}</h1>
                <p className="text-muted-foreground text-lg">{produto.description}</p>
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
                <Button size="lg" className="w-full">
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
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(produto.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
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
                  <div className="grid md:grid-cols-3 gap-4">
                    {produto.applications.map((application, index) => (
                      <div key={index} className="bg-sanders-blue-light p-4 rounded-lg text-center">
                        <span className="font-medium">{application}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="downloads" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Downloads Disponíveis</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {produto.downloads.map((download, index) => (
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
    </div>
  );
};

export default ProdutoDetalhes;