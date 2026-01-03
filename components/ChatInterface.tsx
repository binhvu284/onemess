import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { DUMMY_CONVERSATIONS } from '../constants';
import { Conversation } from '../types';

const ChatInterface: React.FC = () => {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  
  const activeConversation = DUMMY_CONVERSATIONS.find(c => c.id === activeConversationId);

  // Animation variants for the container transition
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="z-20 w-full h-full max-w-[1400px] mx-auto md:p-6 p-0 flex items-center justify-center"
    >
      <div className="w-full h-full md:h-[85vh] flex rounded-none md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-3xl relative">
        
        {/* Desktop: Show both. Mobile: Show sidebar if no active chat */}
        <div className={`w-full md:w-auto md:flex-shrink-0 h-full ${activeConversationId ? 'hidden md:block' : 'block'}`}>
          <Sidebar 
            conversations={DUMMY_CONVERSATIONS} 
            activeId={activeConversationId} 
            onSelect={setActiveConversationId} 
          />
        </div>

        {/* Desktop: Show chat. Mobile: Show chat if active */}
        <div className={`flex-1 h-full bg-black/20 ${!activeConversationId ? 'hidden md:flex items-center justify-center' : 'block'}`}>
          {activeConversation ? (
            <ChatWindow 
              conversation={activeConversation} 
              onBack={() => setActiveConversationId(null)} 
            />
          ) : (
            // Empty State (Desktop only)
            <div className="text-center p-8 opacity-50">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-4xl">👋</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Welcome to OneMess</h3>
              <p className="text-white/50 max-w-xs mx-auto">Select a conversation from the sidebar to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatInterface;