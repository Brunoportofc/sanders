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
    id: "autoclave-horizontal-200l",
    name: "Autoclave Horizontal 200L",
    category: "hospitalares",
    price: "R$ 25.000",
    image: "/api/placeholder/300/200",
    description: "Esterilização segura e eficiente para grandes volumes",
    features: ["Controle digital", "Registro de dados", "Validação automática"],
    novo: false,
    detailedDescription: "A Autoclave Horizontal 200L é projetada para atender às necessidades de esterilização de grandes volumes em hospitais e clínicas. Com tecnologia avançada de controle digital, oferece ciclos de esterilização precisos e confiáveis, garantindo a eliminação completa de microrganismos.",
    specifications: {
      "Capacidade": "200 litros",
      "Temperatura": "121°C - 134°C",
      "Pressão": "1,5 - 2,2 bar",
      "Dimensões": "120 x 80 x 90 cm",
      "Peso": "180 kg",
      "Voltagem": "220V",
      "Potência": "9 kW",
      "Certificação": "ANVISA, CE, ISO 13485"
    },
    gallery: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    benefits: [
      "Esterilização de grandes volumes",
      "Controle digital preciso",
      "Registro automático de dados",
      "Validação de processo",
      "Baixo consumo energético",
      "Manutenção simplificada"
    ],
    applications: [
      "Hospitais e clínicas",
      "Centros cirúrgicos",
      "CME (Central de Material Esterilizado)",
      "Laboratórios",
      "Indústria farmacêutica"
    ]
  },
  {
    id: "lavadora-ultrassonica-40l",
    name: "Lavadora Ultrassônica 40L",
    category: "hospitalares", 
    price: "R$ 18.000",
    image: "/api/placeholder/300/200",
    description: "Limpeza profunda de instrumentos cirúrgicos",
    features: ["Frequência ajustável", "Aquecimento", "Timer digital"],
    novo: true,
    detailedDescription: "A Lavadora Ultrassônica 40L utiliza tecnologia de ultrassom para proporcionar limpeza profunda e eficiente de instrumentos cirúrgicos e odontológicos. Com frequência ajustável e sistema de aquecimento, garante a remoção completa de resíduos orgânicos e inorgânicos.",
    specifications: {
      "Capacidade": "40 litros",
      "Frequência": "25/40/80 kHz",
      "Temperatura": "Ambiente até 80°C",
      "Potência Ultrassônica": "600W",
      "Dimensões": "60 x 50 x 40 cm",
      "Peso": "35 kg",
      "Voltagem": "220V",
      "Material": "Aço inoxidável 316L",
      "Certificação": "ANVISA, CE"
    },
    gallery: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    benefits: [
      "Limpeza ultrassônica profunda",
      "Frequência ajustável para diferentes materiais",
      "Sistema de aquecimento integrado",
      "Timer digital programável",
      "Construção em aço inoxidável",
      "Baixo nível de ruído"
    ],
    applications: [
      "Instrumentos cirúrgicos",
      "Equipamentos odontológicos",
      "Peças de precisão",
      "Joias e relógios",
      "Componentes eletrônicos"
    ]
  },
  {
    id: "estufa-secagem-100l",
    name: "Estufa de Secagem 100L",
    category: "hospitalares",
    price: "R$ 8.500",
    image: "/api/placeholder/300/200", 
    description: "Secagem controlada pós-esterilização",
    features: ["Controle de temperatura", "Circulação forçada", "Timer"],
    novo: false,
    detailedDescription: "A Estufa de Secagem 100L é essencial para o processo de secagem controlada de instrumentos após a esterilização. Com sistema de circulação forçada de ar e controle preciso de temperatura, garante secagem uniforme e eficiente.",
    specifications: {
      "Capacidade": "100 litros",
      "Temperatura": "50°C - 200°C",
      "Precisão": "±2°C",
      "Dimensões": "70 x 60 x 50 cm",
      "Peso": "45 kg",
      "Voltagem": "220V",
      "Potência": "2,5 kW",
      "Material": "Aço inoxidável",
      "Certificação": "ANVISA, INMETRO"
    },
    gallery: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    benefits: [
      "Secagem uniforme e controlada",
      "Circulação forçada de ar",
      "Controle digital de temperatura",
      "Timer programável",
      "Construção robusta",
      "Baixo consumo energético"
    ],
    applications: [
      "Secagem pós-esterilização",
      "Laboratórios",
      "Indústria farmacêutica",
      "Pesquisa e desenvolvimento"
    ]
  },
  {
    id: "autoclave-odonto-12l",
    name: "Autoclave Odontológica 12L",
    category: "odontologicos",
    price: "R$ 4.500",
    image: "/api/placeholder/300/200",
    description: "Compacta e ideal para consultórios odontológicos",
    features: ["Ciclo rápido", "Fácil operação", "Compacta"],
    novo: false,
    detailedDescription: "A Autoclave Odontológica 12L foi desenvolvida especificamente para consultórios odontológicos, oferecendo esterilização rápida e eficiente em formato compacto. Ideal para instrumentos odontológicos e pequenos volumes.",
    specifications: {
      "Capacidade": "12 litros",
      "Temperatura": "121°C - 134°C",
      "Pressão": "1,5 - 2,2 bar",
      "Dimensões": "45 x 35 x 30 cm",
      "Peso": "25 kg",
      "Voltagem": "220V",
      "Potência": "2 kW",
      "Ciclo": "15-30 minutos",
      "Certificação": "ANVISA, CE"
    },
    gallery: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    benefits: [
      "Design compacto para consultórios",
      "Ciclos de esterilização rápidos",
      "Operação simples e intuitiva",
      "Baixo consumo de água",
      "Manutenção facilitada",
      "Excelente custo-benefício"
    ],
    applications: [
      "Consultórios odontológicos",
      "Clínicas especializadas",
      "Instrumentos odontológicos",
      "Pequenos volumes"
    ]
  },
  {
    id: "fotopolimerizador-led",
    name: "Fotopolimerizador LED",
    category: "odontologicos",
    price: "R$ 1.200",
    image: "/api/placeholder/300/200",
    description: "Polimerização rápida e uniforme",
    features: ["LED de alta potência", "Sem fio", "Múltiplos programas"],
    novo: true,
    detailedDescription: "O Fotopolimerizador LED oferece polimerização rápida e uniforme de resinas compostas. Com tecnologia LED de alta potência e design sem fio, proporciona liberdade de movimento e eficiência no tratamento odontológico.",
    specifications: {
      "Tipo de Luz": "LED Azul",
      "Comprimento de Onda": "420-480 nm",
      "Intensidade": "1200 mW/cm²",
      "Bateria": "Li-ion recarregável",
      "Autonomia": "300 ciclos",
      "Peso": "180g",
      "Dimensões": "20 x 3 x 3 cm",
      "Programas": "3 modos",
      "Certificação": "ANVISA, CE, FDA"
    },
    gallery: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    benefits: [
      "Polimerização rápida e uniforme",
      "LED de alta potência e durabilidade",
      "Design ergonômico e sem fio",
      "Múltiplos programas de polimerização",
      "Bateria de longa duração",
      "Fácil manuseio"
    ],
    applications: [
      "Polimerização de resinas compostas",
      "Ativação de adesivos",
      "Clareamento dental",
      "Procedimentos restauradores"
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