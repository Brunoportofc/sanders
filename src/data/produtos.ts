export interface Produto {
  id: string;
  name: string;
  category: "hospitalares" | "odontologicos";
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
    name: "Termodesinfetora WDS-200D",
    category: "hospitalares",
    image: "/images/termodesinfetora-1.svg",
    description: "Limpeza, termodesinfecção e secagem automática de materiais médico-hospitalares com alto desempenho",
    features: [
      "Display LCD com teclado alfanumérico",
      "Sistema de super secagem por turbina com filtro HEPA",
      "Duas portas basculantes em vidro temperado",
      "Sistema de rastreabilidade com impressora",
      "12 programações (6 pré-programadas + 6 personalizáveis)",
      "Alarmes de segurança visuais e sonoros",
      "Iluminação interna da câmara",
      "Trava de porta elétrica",
      "Braços aspersores sem contato com materiais",
      "3 entradas de água (fria, quente e desmineralizada)",
      "Até 3 bombas dosadoras para soluções",
      "Saída USB para coleta de dados (opcional)"
    ],
    novo: true,
    detailedDescription: "A Termodesinfectora WDS-200D da Sanders do Brasil realiza a limpeza, termodesinfecção e secagem automática de materiais médico-hospitalares com alto desempenho e segurança. Com capacidade útil de 280 litros, conta com 2 portas basculantes instaladas em barreira sanitária, otimizando o fluxo e garantindo compactação do espaço, sem necessidade de carrinhos de transporte. Possui visor de cristal líquido e teclado de membrana para operação intuitiva, além de facilitar o carregamento direto, ideal para ambientes com área reduzida. Atende integralmente à RDC nº 15/2012 da Anvisa para CME hospitalar, em conformidade com a norma ABNT NBR ISO 15883-1 e 2.",
    specifications: {
      "Capacidade Total": "280 litros",
      "Volume de Água por Fase": "18 litros",
      "Temperatura da Água": "80°C a 93°C",
      "Rack de Capacidade": "8 cestos DIN",
      "Dimensões Externas (L x A x P)": "950 x 1700 x 850 mm",
      "Dimensões Internas (L x A x P)": "600 x 760 x 610 mm",
      "Alimentação Elétrica": "220Vac ou 380Vac ~ 60Hz Trifásico",
      "Potência": "Até 18 KVA",
      "Material da Estrutura": "Aço inoxidável 304 e 316",
      "Tipo de Portas": "2 portas basculantes com vidro temperado",
      "Sistema de Secagem": "Turbina com filtro absoluto HEPA",
      "Entradas de Água": "3 (fria, quente e desmineralizada)",
      "Bombas Dosadoras": "2 bombas (opcional até 3)",
      "Número de Programações": "12 (6 pré-programadas + 6 personalizáveis)",
      "Duração dos Ciclos": "1 a 30 minutos",
      "Sistema de Trava": "Elétrico",
      "Normas Atendidas": "ANVISA RDC 15/2012, ISO 15883-1 e 2"
    },
    gallery: [
      "/TermodesinfectoraWDS-380SD.glb",
      "/images/termodesinfetora-1.svg",
      "/images/termodesinfetora-2.svg",
      "/termo1.jpg",
      "/termo2.jpg",
      "/termo3.jpg"
    ],
    benefits: [
      "Alta capacidade de 280 litros para processamento em larga escala",
      "Economia de espaço com carregamento direto sem carrinhos",
      "Sistema de dupla porta em barreira sanitária",
      "Controle preciso de temperatura entre 80°C e 93°C",
      "Super secagem com filtro HEPA para máxima segurança",
      "Documentação completa do processo com impressora integrada",
      "Programação flexível com 6 ciclos personalizáveis",
      "Alarmes inteligentes para máxima segurança operacional",
      "Construção robusta em aço inox 304 e 316",
      "Iluminação interna para monitoramento visual",
      "Interface LCD intuitiva e fácil de usar",
      "Sistema de rastreabilidade completo"
    ],
    applications: [
      "Centros de Material e Esterilização (CME) hospitalar",
      "Hospitais de médio e grande porte",
      "Clínicas cirúrgicas especializadas",
      "Instrumentos cirúrgicos em geral",
      "Materiais termossensíveis",
      "Vidrarias e garrafas médicas",
      "Tubos respiratórios",
      "Endoscópios flexíveis",
      "Instrumentos de hemodiálise",
      "Materiais de anestesia"
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