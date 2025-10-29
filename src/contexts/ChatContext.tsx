import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChatState, ChatStep, ChatMessage, UserData } from '@/types/chat';
import { gtmService } from '../services/gtm';

interface ChatContextType {
  isChatModalOpen: boolean;
  setIsChatModalOpen: (isOpen: boolean) => void;
  showAutoMessage: boolean;
  setShowAutoMessage: (show: boolean) => void;
  hasShownAutoMessage: boolean;
  setHasShownAutoMessage: (shown: boolean) => void;
  // Chat flow state
  chatState: ChatState;
  setChatState: React.Dispatch<React.SetStateAction<ChatState>>;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateUserData: (data: Partial<UserData>) => void;
  nextStep: (step: ChatStep) => void;
  resetChat: () => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const initialChatState: ChatState = {
  currentStep: 'welcome',
  messages: [],
  userData: {},
  isTyping: false,
  isCompleted: false,
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [showAutoMessage, setShowAutoMessage] = useState(false);
  const [hasShownAutoMessage, setHasShownAutoMessage] = useState(false);
  const [chatState, setChatState] = useState<ChatState>(initialChatState);

  // Mostrar mensagem automática após 7 segundos do carregamento da página
  useEffect(() => {
    if (!hasShownAutoMessage) {
      const timer = setTimeout(() => {
        setShowAutoMessage(true);
        setHasShownAutoMessage(true);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [hasShownAutoMessage]);

  // Esconder mensagem automática após 8 segundos
  useEffect(() => {
    if (showAutoMessage) {
      const timer = setTimeout(() => {
        setShowAutoMessage(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showAutoMessage]);

  // Chat flow functions
  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  const updateUserData = (data: Partial<UserData>) => {
    setChatState(prev => ({
      ...prev,
      userData: { ...prev.userData, ...data },
    }));
  };

  const nextStep = (step: ChatStep) => {
    setChatState(prev => ({
      ...prev,
      currentStep: step,
    }));
  };

  const resetChat = () => {
    setChatState(initialChatState);
  };

  const closeChat = () => {
    // Rastrear fechamento do chat no GTM antes de fechar
    if (isChatModalOpen) {
      const hasContactInfo = !!(chatState.userData.name && chatState.userData.email);
      const hasProductSelection = !!(chatState.userData.products && chatState.userData.products.length > 0);
      const leadCompleted = chatState.currentStep === 'completed';
      
      gtmService.trackChatClosed(
        leadCompleted,
        hasProductSelection,
        hasContactInfo,
        'floating_chat'
      );
    }
    
    setIsChatModalOpen(false);
  };

  return (
    <ChatContext.Provider value={{ 
      isChatModalOpen, 
      setIsChatModalOpen,
      showAutoMessage,
      setShowAutoMessage,
      hasShownAutoMessage,
      setHasShownAutoMessage,
      chatState,
      setChatState,
      addMessage,
      updateUserData,
      nextStep,
      resetChat,
      closeChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};