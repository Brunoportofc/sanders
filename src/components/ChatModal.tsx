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

// Componente de animação de digitação
const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-3 bg-gray-100 rounded-lg max-w-[80%]">
    <Bot className="h-4 w-4 text-sanders-blue" />
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-sanders-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-sanders-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-sanders-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
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
    
    // Envia evento para Google Tag Manager
    sendGTMEvent('chat_product_selected', {
      product_name: productName,
      source: 'floating_chat',
      timestamp: new Date().toISOString()
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
        source: isFloatingChat ? 'floating_chat' : 'product_page',
        product_name: productName || 'none',
        timestamp: new Date().toISOString()
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
      
      // Envia evento para Google Tag Manager
      sendGTMEvent('chat_lead_generated', {
        lead_name: leadData.name,
        lead_email: leadData.email,
        lead_phone: leadData.phone,
        lead_company: leadData.company,
        lead_product: leadData.selectedProduct,
        lead_source: leadData.source,
        value: 1
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
    resetChat();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-end z-50 p-4 animate-in fade-in-0 duration-300">
      <Card className="w-full max-w-md h-[600px] flex flex-col animate-in slide-in-from-bottom-5 fade-in-0 duration-500 ease-out transform">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-sanders-blue text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">Chat Sanders</h3>
              <p className="text-xs opacity-90">Solicitar Cotação</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-0 slide-in-from-bottom-2 duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg transform transition-all duration-300 hover:scale-105 ${
                  message.sender === 'user'
                    ? 'bg-sanders-blue text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <Bot className="h-4 w-4 mt-0.5 text-sanders-blue" />
                  )}
                  {message.sender === 'user' && (
                    <User className="h-4 w-4 mt-0.5" />
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Indicador de digitação */}
          {isTyping && (
            <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
              <TypingIndicator />
            </div>
          )}
          
          {/* Opções de produtos para chat flutuante */}
          {isFloatingChat && currentStep === 0 && !isTyping && messages.length > 0 && (
            <div className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
              <div className="text-sm text-gray-600 mb-2">Escolha uma das opções abaixo:</div>
              {produtos.slice(0, 4).map((produto) => (
                <Button
                  key={produto.id}
                  variant="outline"
                  className="w-full justify-start text-left hover:bg-sanders-blue hover:text-white transition-colors duration-300"
                  onClick={() => handleProductSelection(produto.name)}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{produto.name}</span>
                    <span className="text-xs opacity-70">{produto.description}</span>
                  </div>
                </Button>
              ))}
            </div>
          )}
          
          {/* Botões de contato direto */}
          {currentStep >= chatSteps.length && !isTyping && (
            <div className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-sanders-blue hover:text-white transition-colors duration-300"
                onClick={() => window.open('tel:+551140041234')}
              >
                <Phone className="h-4 w-4 mr-2" />
                (11) 4004-1234
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-sanders-blue hover:text-white transition-colors duration-300"
                onClick={() => window.open('mailto:vendas@sandersdobrasil.com.br')}
              >
                <Mail className="h-4 w-4 mr-2" />
                vendas@sandersdobrasil.com.br
              </Button>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {currentStep < chatSteps.length && (
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua resposta..."
                type={chatSteps[currentStep]?.type || 'text'}
                className="flex-1 focus:ring-2 focus:ring-sanders-blue transition-all duration-200"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                size="sm"
                disabled={isTyping || !inputValue.trim()}
                className="bg-sanders-blue hover:bg-sanders-blue/90 transition-colors duration-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatModal;