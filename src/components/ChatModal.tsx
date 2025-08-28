import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useChatFlow } from '@/hooks/useChatFlow';
import { useChatContext } from '@/contexts/ChatContext';
import { ChatMessage } from '@/types/chat';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Componente de animação de digitação
const TypingIndicator = () => (
  <div className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl max-w-[80%]">
    <div className="flex-shrink-0 w-8 h-8 bg-sanders-blue rounded-full flex items-center justify-center">
      <Bot className="h-4 w-4 text-white" />
    </div>
    <div className="flex space-x-1.5">
      <div className="w-2 h-2 bg-sanders-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-sanders-blue rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
      <div className="w-2 h-2 bg-sanders-blue rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
    </div>
    <div className="text-xs text-gray-500 dark:text-gray-400">digitando...</div>
  </div>
);

// Componente para renderizar mensagem do bot
const BotMessage: React.FC<{ message: ChatMessage; onOptionClick: (value: string) => void }> = ({ message, onOptionClick }) => (
  <div className="flex items-start space-x-3 mb-4">
    <div className="flex-shrink-0 w-8 h-8 bg-sanders-blue rounded-full flex items-center justify-center">
      <Bot className="h-4 w-4 text-white" />
    </div>
    <div className="flex-1 max-w-[80%]">
      <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
        <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
          {message.content}
        </p>
      </div>
      {message.options && message.options.length > 0 && (
        <div className="mt-3 space-y-2">
          {message.options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              size="sm"
              onClick={() => onOptionClick(option.value)}
              className="mr-2 mb-2 bg-white dark:bg-gray-800 border-sanders-blue text-sanders-blue hover:bg-sanders-blue hover:text-white transition-colors"
            >
              {option.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  </div>
);

// Componente para renderizar mensagem do usuário
const UserMessage: React.FC<{ message: ChatMessage }> = ({ message }) => (
  <div className="flex items-start space-x-3 mb-4 justify-end">
    <div className="flex-1 max-w-[80%] text-right">
      <div className="bg-sanders-blue rounded-2xl p-4 inline-block">
        <p className="text-sm text-white">
          {message.content}
        </p>
      </div>
    </div>
    <div className="flex-shrink-0 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
      <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
    </div>
  </div>
);

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { closeChat } = useChatContext();
  const { 
    processUserInput, 
    startChat, 
    isTyping, 
    messages, 
    currentStep 
  } = useChatFlow();

  // Auto scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focar no input quando o bot terminar de digitar
  useEffect(() => {
    if (!isTyping && currentStep !== 'product_selection' && currentStep !== 'whatsapp_redirect') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isTyping, currentStep]);

  // Iniciar chat quando modal abrir (apenas uma vez)
  useEffect(() => {
    if (isOpen && !hasStarted) {
      startChat();
      setHasStarted(true);
    }
  }, [isOpen, hasStarted, startChat]);

  // Reset quando modal fechar
  useEffect(() => {
    if (!isOpen) {
      setHasStarted(false);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      if (currentStep === 'product_selection' && selectedProducts.length > 0) {
        processUserInput(selectedProducts.join(', '));
        setSelectedProducts([]);
      } else {
        processUserInput(inputValue.trim());
      }
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOptionClick = (value: string) => {
    if (currentStep === 'product_selection') {
      // Para seleção de produtos, permitir múltipla seleção
      setSelectedProducts(prev => {
        if (prev.includes(value)) {
          return prev.filter(p => p !== value);
        } else {
          return [...prev, value];
        }
      });
    } else {
      // Para outras opções, processar imediatamente
      processUserInput(value);
    }
  };

  const handleProductSelectionConfirm = () => {
    if (selectedProducts.length > 0) {
      processUserInput(selectedProducts.join(', '));
      setSelectedProducts([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-end z-50 p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col bg-white dark:bg-gray-800 shadow-2xl mr-4 mb-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sanders-blue rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Júlia - Sanders do Brasil</h3>
              <p className="text-sm text-green-500">Online agora</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              closeChat();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            message.type === 'bot' ? (
              <BotMessage 
                key={message.id} 
                message={message} 
                onOptionClick={handleOptionClick}
              />
            ) : (
              <UserMessage key={message.id} message={message} />
            )
          ))}
          
          {isTyping && <TypingIndicator />}
          
          {/* Botão de confirmação para seleção múltipla de produtos */}
          {currentStep === 'product_selection' && selectedProducts.length > 0 && (
            <div className="flex justify-center">
              <Button
                onClick={handleProductSelectionConfirm}
                className="bg-sanders-blue hover:bg-sanders-blue-dark text-white"
              >
                Confirmar Seleção ({selectedProducts.length})
              </Button>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {currentStep !== 'whatsapp_redirect' && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1"
                disabled={isTyping || currentStep === 'product_selection'}
                autoFocus
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping || (currentStep === 'product_selection' && selectedProducts.length === 0)}
                className="bg-sanders-blue hover:bg-sanders-blue-dark text-white"
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