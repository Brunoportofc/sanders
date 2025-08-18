import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  isChatModalOpen: boolean;
  setIsChatModalOpen: (isOpen: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  return (
    <ChatContext.Provider value={{ isChatModalOpen, setIsChatModalOpen }}>
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