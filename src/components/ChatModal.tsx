import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Bot, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { produtos } from '@/data/produtos';

// Função para enviar eventos para o Google Tag Manager
const sendGTMEvent = (eventName: string, eventData: any) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...eventData
    });
  }
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  isFloatingChat?: boolean;
}

// Componente de animação de digitação premium
const TypingIndicator = () => (
  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl max-w-[80%] shadow-lg border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm hover-lift animate-breathe">
    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-sanders-blue to-sanders-ocean rounded-full flex items-center justify-center shadow-md animate-pulse-soft">
      <Bot className="h-4 w-4 text-white animate-bounce-in" />
    </div>
    <div className="flex space-x-1.5 animate-typing-dots">
      <div className="w-2.5 h-2.5 bg-gradient-to-r from-sanders-blue to-sanders-ocean rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2.5 h-2.5 bg-gradient-to-r from-sanders-ocean to-sanders-blue-dark rounded-full animate-bounce shadow-sm" style={{ animationDelay: '200ms' }}></div>
      <div className="w-2.5 h-2.5 bg-gradient-to-r from-sanders-blue-dark to-sanders-blue rounded-full animate-bounce shadow-sm" style={{ animationDelay: '400ms' }}></div>
    </div>
    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium animate-pulse">digitando...</div>
  </div>
);

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, productName, isFloatingChat = false }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    selectedProduct: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Função para gerar mensagem inicial baseada no contexto
  const getInitialMessage = () => {
    if (isFloatingChat) {
      return {
        question: "Olá! 👋 Bem-vindo à Sanders Medical! Sou seu assistente virtual e estou aqui para ajudá-lo. Em qual de nossos produtos você tem interesse?",
        field: 'product_selection',
        type: 'product_options'
      };
    } else {
      return {
        question: `Olá! 👋 Vejo que você tem interesse no ${productName || 'nosso produto'}. Qual é o seu nome?`,
        field: 'name',
        type: 'text'
      };
    }
  };

  const getChatSteps = () => {
    const steps = [getInitialMessage()];
    
    if (isFloatingChat) {
      steps.push(
        {
          question: `Excelente escolha! Agora preciso de algumas informações para enviar a cotação do ${userInfo.selectedProduct || 'produto selecionado'}. Qual é o seu nome?`,
          field: 'name',
          type: 'text'
        }
      );
    }
    
    steps.push(
      {
        question: 'Perfeito! Qual é o seu e-mail para enviarmos a cotação?',
        field: 'email',
        type: 'email'
      },
      {
        question: 'Ótimo! Pode me informar seu telefone para contato?',
        field: 'phone',
        type: 'tel'
      },
      {
        question: 'Qual é o nome da sua empresa ou instituição?',
        field: 'company',
        type: 'text'
      },
      {
        question: 'Para finalizar, gostaria de deixar alguma observação específica sobre sua necessidade?',
        field: 'message',
        type: 'textarea'
      }
    );
    
    return steps;
  };
  
  const chatSteps = getChatSteps();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductSelection = (productName: string) => {
    // Adiciona a mensagem do usuário
    addMessage(productName, 'user');
    
    // Atualiza o produto selecionado
    setUserInfo(prev => ({ ...prev, selectedProduct: productName }));
    
    // Envia evento para Google Tag Manager com dados estruturados
    const selectedProductData = produtos.find(p => p.name === productName);
    sendGTMEvent('chat_product_selected', {
      // Produto Selecionado
      product_name: productName,
      product_category: selectedProductData?.category || 'Não especificado',
      product_id: selectedProductData?.id || 'unknown',
      
      // Contexto da Seleção
      selection_source: isFloatingChat ? 'floating_chat' : 'product_page',
      page_product: productName || 'Página inicial',
      
      // Dados Temporais
      selection_timestamp: new Date().toISOString(),
      selection_date: new Date().toLocaleDateString('pt-BR'),
      selection_time: new Date().toLocaleTimeString('pt-BR'),
      
      // Dados Técnicos
      page_url: window.location.href,
      user_agent: navigator.userAgent
    });
    
    // Avança para o próximo step
    setCurrentStep(1);
    
    // Simula digitação e envia próxima pergunta
    setTimeout(() => {
      simulateTyping(() => {
        const nextQuestion = `Excelente escolha! Agora preciso de algumas informações para enviar a cotação do ${productName}. Qual é o seu nome?`;
        addMessage(nextQuestion, 'bot');
      });
    }, 1000);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Envia evento para Google Tag Manager quando o chat é aberto
      sendGTMEvent('chat_opened', {
        // Contexto da Abertura
        chat_source: isFloatingChat ? 'floating_chat' : 'product_page',
        page_product: productName || 'Página inicial',
        
        // Dados Temporais
        open_timestamp: new Date().toISOString(),
        open_date: new Date().toLocaleDateString('pt-BR'),
        open_time: new Date().toLocaleTimeString('pt-BR'),
        open_day_of_week: new Date().toLocaleDateString('pt-BR', { weekday: 'long' }),
        
        // Dados da Sessão
        session_start: true,
        chat_type: 'lead_generation',
        
        // Dados Técnicos
        page_url: window.location.href,
        page_title: document.title,
        referrer: document.referrer || 'Direct',
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
      });
      
      // Simula digitação inicial
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const initialMessage: Message = {
          id: '1',
          text: chatSteps[0].question,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages([initialMessage]);
      }, 2000);
    }
  }, [isOpen]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Adiciona mensagem do usuário
    addMessage(inputValue, 'user');

    // Atualiza informações do usuário
    const currentField = chatSteps[currentStep].field as keyof typeof userInfo;
    setUserInfo(prev => ({ ...prev, [currentField]: inputValue }));

    // Envia evento para Google Tag Manager sobre o progresso do chat
    sendGTMEvent('chat_step_completed', {
      // Progresso do Chat
      step_number: currentStep + 1,
      step_field: currentField,
      step_value: inputValue,
      total_steps: chatSteps.length,
      progress_percentage: Math.round(((currentStep + 1) / chatSteps.length) * 100),
      
      // Contexto
      chat_source: isFloatingChat ? 'floating_chat' : 'product_page',
      page_product: productName || 'Página inicial',
      
      // Dados do Lead (parciais)
      has_product_selection: !!userInfo.selectedProduct,
      collected_fields: Object.keys(userInfo).filter(key => userInfo[key as keyof typeof userInfo]).length,
      
      // Dados Temporais
      step_timestamp: new Date().toISOString(),
      step_date: new Date().toLocaleDateString('pt-BR'),
      step_time: new Date().toLocaleTimeString('pt-BR'),
      
      // Dados Técnicos
      page_url: window.location.href
    });

    setInputValue('');

    // Próximo passo com animação de digitação
    if (currentStep < chatSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      simulateTyping(() => {
        addMessage(chatSteps[nextStep].question, 'bot');
      });
    } else {
      // Finaliza o chat e envia dados para GTM
      const leadData = {
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        company: userInfo.company,
        message: userInfo.message,
        selectedProduct: userInfo.selectedProduct,
        timestamp: new Date().toISOString(),
        source: isFloatingChat ? 'floating_chat' : 'product_page'
      };
      
      // Envia evento para Google Tag Manager com variáveis estruturadas para marketing
      sendGTMEvent('chat_lead_generated', {
        // Informações do Lead
        lead_name: leadData.name,
        lead_email: leadData.email,
        lead_phone: leadData.phone,
        lead_company: leadData.company,
        lead_message: leadData.message,
        
        // Produto de Interesse
        lead_product: leadData.selectedProduct,
        product_category: produtos.find(p => p.name === leadData.selectedProduct)?.category || 'Não especificado',
        
        // Origem e Contexto
        lead_source: leadData.source,
        chat_type: isFloatingChat ? 'floating_chat' : 'product_page',
        page_product: productName || 'Página inicial',
        
        // Dados para Segmentação
        lead_timestamp: leadData.timestamp,
        lead_date: new Date().toLocaleDateString('pt-BR'),
        lead_time: new Date().toLocaleTimeString('pt-BR'),
        lead_day_of_week: new Date().toLocaleDateString('pt-BR', { weekday: 'long' }),
        
        // Métricas para Marketing
        conversion_value: 1,
        lead_quality: 'qualified', // Lead qualificado pois preencheu todos os dados
        funnel_stage: 'consideration', // Estágio do funil
        
        // Dados Técnicos
        user_agent: navigator.userAgent,
        page_url: window.location.href,
        referrer: document.referrer || 'Direct'
      });
      
      simulateTyping(() => {
        addMessage(
          `Perfeito! Recebi todas as informações. Nossa equipe entrará em contato em breve no e-mail ${userInfo.email} ou telefone que você informou. Obrigado pelo interesse! 🚀`,
          'bot'
        );
        setTimeout(() => {
          simulateTyping(() => {
            addMessage(
              'Você também pode entrar em contato diretamente:',
              'bot'
            );
          }, 1000);
        }, 2000);
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep(0);
    setIsTyping(false);
    setUserInfo({ name: '', email: '', phone: '', company: '', message: '', selectedProduct: '' });
    setInputValue('');
  };

  const handleClose = () => {
    // Envia evento para Google Tag Manager quando o chat é fechado
    sendGTMEvent('chat_closed', {
      // Dados de Engajamento
      messages_sent: messages.filter(m => m.sender === 'user').length,
      chat_duration_seconds: messages.length > 0 ? Math.round((new Date().getTime() - messages[0].timestamp.getTime()) / 1000) : 0,
      completed_steps: currentStep,
      total_steps: chatSteps.length,
      completion_rate: Math.round((currentStep / chatSteps.length) * 100),
      
      // Status do Lead
      lead_completed: currentStep >= chatSteps.length,
      has_product_selection: !!userInfo.selectedProduct,
      has_contact_info: !!(userInfo.name && userInfo.email),
      
      // Contexto
      chat_source: isFloatingChat ? 'floating_chat' : 'product_page',
      page_product: productName || 'Página inicial',
      
      // Dados Temporais
      close_timestamp: new Date().toISOString(),
      close_date: new Date().toLocaleDateString('pt-BR'),
      close_time: new Date().toLocaleTimeString('pt-BR'),
      
      // Dados Técnicos
      page_url: window.location.href
    });
    
    resetChat();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-end z-50 p-4 animate-in fade-in-0 duration-300">
      <Card className="w-full max-w-md h-[600px] flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-2xl overflow-hidden">
        {/* Header Premium */}
        <div className="relative flex items-center justify-between p-4 bg-gradient-to-r from-sanders-blue via-sanders-ocean to-sanders-blue-dark text-white overflow-hidden rounded-t-2xl">

          
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Sanders Brasil</h3>
              <p className="text-sm text-white/80">Assistente Virtual</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:scale-105"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30 dark:bg-gray-800/30"
        >
          {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-sanders-blue via-sanders-ocean to-sanders-blue-dark text-white shadow-sm'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-600'
                  } p-4 rounded-xl transition-all duration-200`}
                >

                  
                  {message.sender === 'bot' && (
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-sanders-blue via-sanders-ocean to-sanders-blue-dark rounded-full flex items-center justify-center mr-3">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-sanders-blue dark:text-sanders-blue-light">
                          Sanders Assistant
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {message.sender === 'user' && (
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-xs font-semibold text-white/90 mr-2">Você</span>
                      <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  
                  <div className={`mt-2 pt-2 border-t ${
                    message.sender === 'user' 
                      ? 'border-white/20 text-white/60' 
                      : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                  }`}>
                    <span className="text-xs">
                      {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          
          {/* Indicador de digitação */}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 max-w-[85%]">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-sanders-blue via-sanders-ocean to-sanders-blue-dark rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Sanders está digitando</span>
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-sanders-blue rounded-full animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-sanders-ocean rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 bg-sanders-blue-dark rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Opções de produtos premium para chat flutuante - Design Premium */}
          {isFloatingChat && currentStep === 0 && !isTyping && messages.length > 0 && (
            <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 p-4 bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-100/80 dark:from-gray-800/80 dark:via-gray-700/60 dark:to-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/30 dark:border-gray-600/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-sanders-blue via-sanders-ocean to-sanders-blue-dark rounded-2xl flex items-center justify-center mr-4 shadow-xl">
                  <span className="text-white text-xl font-bold">🏥</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 bg-gradient-to-r from-sanders-blue to-sanders-ocean bg-clip-text text-transparent">Escolha sua Linha de Interesse</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Selecione o produto que melhor atende às suas necessidades</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {produtos.slice(0, 4).map((produto, index) => (
                  <button
                    key={produto.id}
                    onClick={() => handleProductSelection(produto.name)}
                    className="group relative justify-start text-left h-auto p-4 border border-gray-200 dark:border-gray-600 hover:border-sanders-blue hover:bg-gradient-to-r hover:from-sanders-blue hover:to-sanders-ocean hover:text-white transition-all duration-200 rounded-xl"
                  >
                    <div className="flex items-center w-full">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sanders-blue via-sanders-ocean to-sanders-blue-dark rounded-xl flex items-center justify-center mr-4 transition-all duration-200">
                        <span className="text-xl">
                          {index === 0 ? '🏥' : index === 1 ? '🔬' : index === 2 ? '🦷' : '💊'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-base group-hover:text-white transition-colors duration-200">{produto.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-white/90 mt-1 transition-colors duration-200">{produto.description}</div>
                      </div>
                      <div className="flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-6 h-6 bg-gray-200 group-hover:bg-white/20 rounded-lg flex items-center justify-center">
                          <span className="text-gray-600 group-hover:text-white text-sm font-bold">→</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Botões de contato direto premium */}
          {currentStep >= chatSteps.length && !isTyping && (
            <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 p-6 bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-100/80 dark:from-gray-800/80 dark:via-gray-700/60 dark:to-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/30 dark:border-gray-600/30">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 rounded-full shadow-lg">
                  <span className="text-green-600 dark:text-green-300 text-sm font-bold">✅ Contato Direto Disponível</span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  sendGTMEvent('chat_whatsapp_click', { source: 'chat_modal' });
                  window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre as autoclaves Sanders.', '_blank');
                }}
                className="w-full p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-600 rounded-xl hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      WhatsApp
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Converse diretamente com nossos especialistas
                    </p>

                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  sendGTMEvent('chat_phone_click', { source: 'chat_modal' });
                  window.open('tel:+551140041234');
                }}
                className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-600 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      Telefone
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Ligue agora e fale com nossos consultores
                    </p>
                    <div className="text-base font-semibold text-blue-600 dark:text-blue-400">
                      (11) 4004-1234
                    </div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  sendGTMEvent('chat_email_click', { source: 'chat_modal' });
                  window.open('mailto:vendas@sandersdobrasil.com.br');
                }}
                className="w-full p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-600 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      E-mail
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Envie sua dúvida por e-mail
                    </p>
                    <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      vendas@sandersdobrasil.com.br
                    </div>
                  </div>
                </div>
              </button>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {currentStep < chatSteps.length && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-b-2xl">
            {/* Status indicators */}
            <div className="flex items-center justify-end mb-3">
              <div className="text-xs text-gray-400 dark:text-gray-500">
                Shift + Enter para nova linha
              </div>
            </div>
            
            {/* Character counter */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {inputValue.length}/500 caracteres
              </div>
              <div className={`text-xs transition-colors duration-200 ${
                inputValue.length > 450 ? 'text-red-500' : 
                inputValue.length > 350 ? 'text-yellow-500' : 
                'text-gray-400'
              }`}>
                {inputValue.length > 450 ? '⚠️ Limite próximo' : 
                 inputValue.length > 350 ? '⚡ Quase no limite' : 
                 ''}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="w-full py-3 text-base bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-sanders-blue focus:ring-2 focus:ring-sanders-blue/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  maxLength={500}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-3 bg-gradient-to-r from-sanders-blue via-sanders-ocean to-sanders-blue-dark hover:opacity-90 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatModal;