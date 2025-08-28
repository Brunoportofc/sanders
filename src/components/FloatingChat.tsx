import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatContext } from '@/contexts/ChatContext';
import ChatModal from './ChatModal';
import AutoChatMessage from './AutoChatMessage';

const FloatingChat: React.FC = () => {
  const { 
    isChatModalOpen, 
    setIsChatModalOpen,
    showAutoMessage,
    setShowAutoMessage
  } = useChatContext();

  const handleChatToggle = () => {
    setIsChatModalOpen(!isChatModalOpen);
    // Esconder mensagem automática quando o chat for aberto
    if (showAutoMessage) {
      setShowAutoMessage(false);
    }
  };

  const handleAutoMessageClose = () => {
    setShowAutoMessage(false);
  };

  const handleAutoMessageChatOpen = () => {
    setShowAutoMessage(false);
    setIsChatModalOpen(true);
  };

  return (
    <>
      {/* Mensagem Automática */}
      <AutoChatMessage 
        isVisible={showAutoMessage}
        onClose={handleAutoMessageClose}
        onChatOpen={handleAutoMessageChatOpen}
      />
      
      {/* Botão do Chat Flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Indicador de notificação */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse z-10"></div>
          
          <Button
            onClick={handleChatToggle}
            className="w-14 h-14 rounded-full bg-sanders-blue hover:bg-sanders-blue-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            aria-label="Abrir chat de suporte"
          >
            {isChatModalOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6" />
            )}
          </Button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Precisa de ajuda?
          </div>
        </div>
      </div>

      {/* Modal do Chat */}
      <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
    </>
  );
};

export default FloatingChat;