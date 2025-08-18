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
        <div className="fixed bottom-6 right-6 z-[9999]">
          <Button
            onClick={() => setIsChatModalOpen(true)}
            size="lg"
            className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
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