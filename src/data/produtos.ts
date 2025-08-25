export interface Produto {
  id: string;
  name: string;
  category: "hospitalares" | "odontologicos";
  price: string;
  image: string;
  description: string;
  features: string[];
  novo: boolean;
  detailedDescription?: string;
  specifications?: {
    [key: string]: string;
  };
  gallery?: string[];
  benefits?: string[];
  applications?: string[];
}

export const produtos: Produto[] = [
  {
    id: "termodesinfetora-digital-60l",
    name: "Termodesinfetora Digital 60L",
    category: "odontologicos",
    price: "R$ 15.800",
    image: "/images/termodesinfetora-1.svg",
    description: "Desinfecção térmica segura e eficiente para instrumentos odontológicos",
    features: ["Controle digital", "Registro de dados", "Validação automática"],
    novo: true,
    detailedDescription: "A Termodesinfetora Digital 60L é projetada para atender às necessidades de desinfecção térmica de instrumentos odontológicos. Com tecnologia avançada de controle digital, oferece ciclos de desinfecção precisos e confiáveis, garantindo a eliminação eficaz de microrganismos patogênicos.",
    specifications: {
      "Capacidade": "60 litros",
      "Temperatura": "85°C - 95°C",
      "Tempo de Ciclo": "15-30 minutos",
      "Dimensões": "80 x 60 x 70 cm",
      "Peso": "85 kg",
      "Voltagem": "220V",
      "Potência": "4,5 kW",
      "Material": "Aço inoxidável 316L",
      "Certificação": "ANVISA, CE, ISO 15883"
    },
    gallery: [
      "/teste2 copy.glb",
      "/termo1.jpg",
      "/termo2.jpg",
      "/termo3.jpg"
    ],
    benefits: [
      "Desinfecção térmica eficaz",
      "Controle digital preciso",
      "Registro automático de dados",
      "Validação de processo",
      "Interface intuitiva",
      "Baixo consumo energético",
      "Manutenção simplificada"
    ],
    applications: [
      "Consultórios odontológicos",
      "Clínicas especializadas",
      "Instrumentos rotatórios",
      "Instrumentos manuais",
      "Equipamentos termossensíveis"
    ]
  }
];

export const getProdutoById = (id: string): Produto | undefined => {
  return produtos.find(produto => produto.id === id);
};

export const getProdutosByCategory = (category: "hospitalares" | "odontologicos" | "all"): Produto[] => {
  if (category === "all") return produtos;
  return produtos.filter(produto => produto.category === category);
};