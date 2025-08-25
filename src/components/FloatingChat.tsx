import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatModal from "@/components/ChatModal";
import { useChatContext } from "@/contexts/ChatContext";

const FloatingChat = () => {
  const { isChatModalOpen, setIsChatModalOpen } = useChatContext();

  return (
    <>
      {/* Ícone de Chat Flutuante - só aparece quando o chat está fechado */}
      {!isChatModalOpen && (
        <div className="fixed bottom-6 right-6 z-50 group">
          {/* Anel de pulso sutil */}
          <div className="absolute inset-0">
            <div className="w-16 h-16 bg-sanders-blue/10 rounded-full animate-ping"></div>
          </div>
          
          {/* Botão principal */}
          <Button
            onClick={() => setIsChatModalOpen(true)}
            size="lg"
            className="relative w-16 h-16 bg-gradient-to-br from-sanders-blue via-sanders-ocean to-sanders-blue-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/10"
          >
            {/* Ícone */}
            <div className="flex items-center justify-center w-full h-full">
              <MessageCircle className="h-7 w-7" />
            </div>
            
            {/* Indicador de notificação */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-xs font-bold text-white">!</span>
            </div>
          </Button>
          
          {/* Tooltip clean */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 whitespace-nowrap text-sm">
              Precisa de ajuda? Clique aqui!
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-white dark:border-l-gray-800"></div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      <ChatModal 
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        productName="" // Vazio para indicar que foi aberto pelo ícone flutuante
        isFloatingChat={true}
      />
    </>
  );
};

export default FloatingChat;