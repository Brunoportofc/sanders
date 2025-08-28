import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AutoChatMessageProps {
  isVisible: boolean;
  onClose: () => void;
  onChatOpen: () => void;
}

const AutoChatMessage: React.FC<AutoChatMessageProps> = ({ isVisible, onClose, onChatOpen }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 max-w-xs">
      {/* Mensagem com animação */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 p-4 relative animate-slide-in-right">
        {/* Botão de fechar */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-3 w-3" />
        </Button>
        
        {/* Avatar da assistente */}
        <div className="flex items-start space-x-3 mb-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-sanders-blue to-sanders-ocean rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">👩‍💼</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Assistente Sanders
            </p>
          </div>
        </div>
        
        {/* Mensagem */}
        <div className="ml-11 mb-3">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Quer saber como nossos equipamentos <span className="font-semibold text-sanders-blue">preservam vidas</span>? 😊
          </p>
        </div>
        
        {/* Botão de ação */}
        <div className="ml-11">
          <Button
            onClick={onChatOpen}
            size="sm"
            className="bg-sanders-blue hover:bg-sanders-blue-dark text-white text-xs px-3 py-1 h-7"
          >
            Conversar agora
          </Button>
        </div>
        
        {/* Seta apontando para o chat */}
        <div className="absolute bottom-4 -right-2 w-0 h-0 border-l-8 border-l-white dark:border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </div>
    </div>
  );
};

export default AutoChatMessage;