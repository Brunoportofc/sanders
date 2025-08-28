// Tipos para o sistema de chat conversacional

export interface UserData {
  name: string;
  email: string;
  phone: string;
  document: string; // CPF/CNPJ
  products: string[];
  source: string; // Como conheceu a Sanders
  customerType: 'revendedor' | 'consumidor_final';
}

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: ChatOption[];
  isTyping?: boolean;
}

export interface ChatOption {
  id: string;
  label: string;
  value: string;
}

export type ChatStep = 
  | 'welcome'
  | 'interest_confirmation'
  | 'name_collection'
  | 'email_collection'
  | 'phone_collection'
  | 'document_collection'
  | 'product_selection'
  | 'source_selection'
  | 'customer_type_selection'
  | 'completion'
  | 'whatsapp_redirect';

export interface ChatState {
  currentStep: ChatStep;
  messages: ChatMessage[];
  userData: Partial<UserData>;
  isTyping: boolean;
  isCompleted: boolean;
}

// Opções predefinidas para seleções
export const PRODUCT_OPTIONS: ChatOption[] = [
  { id: 'ultrasonicas', label: 'Ultrassônicas', value: 'Ultrassônicas' },
  { id: 'lavadoras', label: 'Lavadoras Endoscópios', value: 'Lavadoras Endoscópios' },
  { id: 'termodesinfectoras', label: 'Termodesinfectoras', value: 'Termodesinfectoras' },
  { id: 'pistolas', label: 'Conjunto de Pistolas', value: 'Conjunto de Pistolas' },
  { id: 'secadoras', label: 'Secadoras Traqueias', value: 'Secadoras Traqueias' },
  { id: 'autoclave', label: 'Autoclave', value: 'Autoclave' },
  { id: 'osmose', label: 'Osmose Reversa', value: 'Osmose Reversa' },
  { id: 'seladora', label: 'Seladora', value: 'Seladora' }
];

export const SOURCE_OPTIONS: ChatOption[] = [
  { id: 'google', label: 'Google', value: 'Google' },
  { id: 'facebook', label: 'Facebook', value: 'Facebook' },
  { id: 'instagram', label: 'Instagram', value: 'Instagram' },
  { id: 'linkedin', label: 'LinkedIn', value: 'LinkedIn' },
  { id: 'indicacao', label: 'Indicação', value: 'Indicação' },
  { id: 'evento', label: 'Evento/Feira', value: 'Evento/Feira' },
  { id: 'outros', label: 'Outros', value: 'Outros' }
];

export const CUSTOMER_TYPE_OPTIONS: ChatOption[] = [
  { id: 'revendedor', label: 'Revendedor', value: 'revendedor' },
  { id: 'consumidor_final', label: 'Consumidor Final', value: 'consumidor_final' }
];

// Mensagens do bot
export const BOT_MESSAGES = {
  welcome: 'Olá, tudo bem?\n\nEsta interessado em algum de nossos equipamentos? Conte para nós o que você está procurando?',
  interest_confirmation: 'Para isso preciso de algumas informações rápidas 🙂',
  name_request: 'Qual é o seu nome?',
  name_greeting: (name: string) => `Prazer ${name} 👋\n\nEm qual e-mail corporativo gostaria de receber a proposta?`,
  phone_request: 'Poderia me informar seu telefone/whatsapp? (Prometo não incomodar🙏)',
  document_request: 'Legal, estamos quase lá...\n\nQual seu CNPJ/CPF? (Para gerarmos seu cadastro e orçamento🔢)',
  product_selection: 'Qual o produto você tem interesse? Pode marcar mais de um!👇',
  source_selection: 'E por fim, qual a melhor opção demonstra como conheceu a Sanders?👇',
  customer_type_selection: 'Você é revendedor ou consumidor final?🤵',
  completion: 'Obrigado! Em instantes nossa equipe de consultores irá entrar em contato para apresentar nossa soluções para você! 🤝',
  whatsapp_offer: 'Gostaria de falar com nossa equipe agora mesmo?',
  whatsapp_redirect: 'Abrindo o seu WhatsApp...',
  typing: '...',
};

// Validações
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\(?\d{2}\)?[\s-]?9?\d{4}[\s-]?\d{4}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
};