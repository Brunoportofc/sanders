// Serviço de integração com Google Tag Manager
// Baseado na documentação em docs/GTM_INTEGRATION.md

// Declaração global para dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Tipos para os eventos GTM
export interface GTMChatOpenedEvent {
  event: 'chat_opened';
  chat_source: 'floating_chat' | 'product_page';
  page_product?: string;
  open_timestamp: string;
  open_date: string;
  open_time: string;
  open_day_of_week: string;
  session_start: boolean;
  chat_type: 'lead_generation';
  page_url: string;
  page_title: string;
  referrer: string;
  user_agent: string;
  screen_resolution: string;
  viewport_size: string;
}

export interface GTMProductSelectedEvent {
  event: 'chat_product_selected';
  product_name: string;
  product_category: string;
  product_id: string;
  selection_source: 'floating_chat' | 'product_page';
  page_product?: string;
  selection_timestamp: string;
  selection_date: string;
  selection_time: string;
  page_url: string;
  user_agent: string;
}

export interface GTMStepCompletedEvent {
  event: 'chat_step_completed';
  step_number: number;
  step_field: 'name' | 'email' | 'phone' | 'company' | 'message';
  step_value: string;
  total_steps: number;
  progress_percentage: number;
  chat_source: 'floating_chat' | 'product_page';
  page_product?: string;
  has_product_selection: boolean;
  collected_fields: number;
  step_timestamp: string;
  step_date: string;
  step_time: string;
  page_url: string;
}

export interface GTMLeadGeneratedEvent {
  event: 'chat_lead_generated';
  // Informações do Lead
  lead_name: string;
  lead_email: string;
  lead_phone: string;
  lead_company: string;
  lead_message: string;
  // Detalhes do Produto
  lead_product: string;
  product_category: string;
  // Contexto
  lead_source: 'floating_chat' | 'product_page';
  chat_type: 'lead_generation';
  page_product?: string;
  // Dados de Segmentação
  lead_timestamp: string;
  lead_date: string;
  lead_time: string;
  lead_day_of_week: string;
  // Métricas de Marketing
  conversion_value: number;
  lead_quality: 'high' | 'medium' | 'low';
  funnel_stage: 'lead_generated';
  // Dados Técnicos
  user_agent: string;
  page_url: string;
  referrer: string;
}

export interface GTMChatClosedEvent {
  event: 'chat_closed';
  // Dados de Engajamento
  messages_sent: number;
  chat_duration_seconds: number;
  completed_steps: number;
  total_steps: number;
  completion_rate: number;
  // Status do Lead
  lead_completed: boolean;
  has_product_selection: boolean;
  has_contact_info: boolean;
  // Contexto
  chat_source: 'floating_chat' | 'product_page';
  page_product?: string;
  close_timestamp: string;
  close_date: string;
  close_time: string;
  page_url: string;
}

class GTMService {
  private static instance: GTMService;
  private chatStartTime: Date | null = null;
  private messageCount = 0;
  private completedSteps = 0;

  private constructor() {
    // Inicializar dataLayer se não existir
    if (typeof window !== 'undefined' && !window.dataLayer) {
      window.dataLayer = [];
    }
  }

  public static getInstance(): GTMService {
    if (!GTMService.instance) {
      GTMService.instance = new GTMService();
    }
    return GTMService.instance;
  }

  // Utilitários para formatação de data/hora
  private formatDateTime(date: Date) {
    const timestamp = date.toISOString();
    const dateStr = date.toLocaleDateString('pt-BR');
    const timeStr = date.toLocaleTimeString('pt-BR');
    const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'long' });
    
    return {
      timestamp,
      date: dateStr,
      time: timeStr,
      dayOfWeek
    };
  }

  // Utilitários para informações do navegador
  private getBrowserInfo() {
    if (typeof window === 'undefined') {
      return {
        page_url: '',
        page_title: '',
        referrer: '',
        user_agent: '',
        screen_resolution: '',
        viewport_size: ''
      };
    }

    return {
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`
    };
  }

  // Enviar evento para GTM
  private pushToDataLayer(eventData: any) {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(eventData);
      console.log('GTM Event:', eventData);
    }
  }

  // 1. Evento: Chat Aberto
  public trackChatOpened(source: 'floating_chat' | 'product_page', pageProduct?: string) {
    this.chatStartTime = new Date();
    this.messageCount = 0;
    this.completedSteps = 0;

    const dateTime = this.formatDateTime(this.chatStartTime);
    const browserInfo = this.getBrowserInfo();

    const eventData: GTMChatOpenedEvent = {
      event: 'chat_opened',
      chat_source: source,
      page_product: pageProduct,
      open_timestamp: dateTime.timestamp,
      open_date: dateTime.date,
      open_time: dateTime.time,
      open_day_of_week: dateTime.dayOfWeek,
      session_start: true,
      chat_type: 'lead_generation',
      ...browserInfo
    };

    this.pushToDataLayer(eventData);
  }

  // 2. Evento: Produto Selecionado
  public trackProductSelected(
    productName: string,
    productCategory: string,
    productId: string,
    source: 'floating_chat' | 'product_page',
    pageProduct?: string
  ) {
    const dateTime = this.formatDateTime(new Date());
    const browserInfo = this.getBrowserInfo();

    const eventData: GTMProductSelectedEvent = {
      event: 'chat_product_selected',
      product_name: productName,
      product_category: productCategory,
      product_id: productId,
      selection_source: source,
      page_product: pageProduct,
      selection_timestamp: dateTime.timestamp,
      selection_date: dateTime.date,
      selection_time: dateTime.time,
      page_url: browserInfo.page_url,
      user_agent: browserInfo.user_agent
    };

    this.pushToDataLayer(eventData);
  }

  // 3. Evento: Etapa Completada
  public trackStepCompleted(
    stepNumber: number,
    stepField: 'name' | 'email' | 'phone' | 'company' | 'message',
    stepValue: string,
    totalSteps: number,
    source: 'floating_chat' | 'product_page',
    pageProduct?: string,
    hasProductSelection = false
  ) {
    this.completedSteps = Math.max(this.completedSteps, stepNumber);
    const progressPercentage = Math.round((stepNumber / totalSteps) * 100);
    
    const dateTime = this.formatDateTime(new Date());
    const browserInfo = this.getBrowserInfo();

    const eventData: GTMStepCompletedEvent = {
      event: 'chat_step_completed',
      step_number: stepNumber,
      step_field: stepField,
      step_value: stepValue,
      total_steps: totalSteps,
      progress_percentage: progressPercentage,
      chat_source: source,
      page_product: pageProduct,
      has_product_selection: hasProductSelection,
      collected_fields: stepNumber,
      step_timestamp: dateTime.timestamp,
      step_date: dateTime.date,
      step_time: dateTime.time,
      page_url: browserInfo.page_url
    };

    this.pushToDataLayer(eventData);
  }

  // 4. Evento: Lead Gerado (Conversão)
  public trackLeadGenerated(
    leadData: {
      name: string;
      email: string;
      phone: string;
      company: string;
      message: string;
      product: string;
      source: 'floating_chat' | 'product_page';
    },
    pageProduct?: string
  ) {
    const dateTime = this.formatDateTime(new Date());
    const browserInfo = this.getBrowserInfo();

    const eventData: GTMLeadGeneratedEvent = {
      event: 'chat_lead_generated',
      // Informações do Lead
      lead_name: leadData.name,
      lead_email: leadData.email,
      lead_phone: leadData.phone,
      lead_company: leadData.company,
      lead_message: leadData.message,
      // Detalhes do Produto
      lead_product: leadData.product,
      product_category: 'equipamento_medico',
      // Contexto
      lead_source: leadData.source,
      chat_type: 'lead_generation',
      page_product: pageProduct,
      // Dados de Segmentação
      lead_timestamp: dateTime.timestamp,
      lead_date: dateTime.date,
      lead_time: dateTime.time,
      lead_day_of_week: dateTime.dayOfWeek,
      // Métricas de Marketing
      conversion_value: 100,
      lead_quality: 'high',
      funnel_stage: 'lead_generated',
      // Dados Técnicos
      user_agent: browserInfo.user_agent,
      page_url: browserInfo.page_url,
      referrer: browserInfo.referrer
    };

    this.pushToDataLayer(eventData);
  }

  // 5. Evento: Chat Fechado
  public trackChatClosed(
    leadCompleted: boolean,
    hasProductSelection: boolean,
    hasContactInfo: boolean,
    source: 'floating_chat' | 'product_page',
    pageProduct?: string
  ) {
    const now = new Date();
    const chatDuration = this.chatStartTime 
      ? Math.round((now.getTime() - this.chatStartTime.getTime()) / 1000)
      : 0;
    
    const totalSteps = 5; // name, email, phone, company, message
    const completionRate = Math.round((this.completedSteps / totalSteps) * 100);
    
    const dateTime = this.formatDateTime(now);
    const browserInfo = this.getBrowserInfo();

    const eventData: GTMChatClosedEvent = {
      event: 'chat_closed',
      // Dados de Engajamento
      messages_sent: this.messageCount,
      chat_duration_seconds: chatDuration,
      completed_steps: this.completedSteps,
      total_steps: totalSteps,
      completion_rate: completionRate,
      // Status do Lead
      lead_completed: leadCompleted,
      has_product_selection: hasProductSelection,
      has_contact_info: hasContactInfo,
      // Contexto
      chat_source: source,
      page_product: pageProduct,
      close_timestamp: dateTime.timestamp,
      close_date: dateTime.date,
      close_time: dateTime.time,
      page_url: browserInfo.page_url
    };

    this.pushToDataLayer(eventData);
  }

  // Incrementar contador de mensagens
  public incrementMessageCount() {
    this.messageCount++;
  }

  // Reset para nova sessão
  public resetSession() {
    this.chatStartTime = null;
    this.messageCount = 0;
    this.completedSteps = 0;
  }
}

// Exportar instância singleton
export const gtmService = GTMService.getInstance();

// Exportar classe para testes
export { GTMService };