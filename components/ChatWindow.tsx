import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Video, MoreVertical, Send, Paperclip, Smile, ArrowLeft } from 'lucide-react';
import { Conversation, Message } from '../types';

interface ChatWindowProps {
  conversation: Conversation;
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, onBack }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      senderId: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col h-full bg-white/5 backdrop-blur-2xl md:rounded-r-3xl relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="md:hidden p-2 hover:bg-white/10 rounded-full text-white/70">
            <ArrowLeft size={20} />
          </button>
          
          <div className="relative">
            <img src={conversation.user.avatar} alt={conversation.user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10" />
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1e293b] ${conversation.user.status === 'online' ? 'bg-green-500' : conversation.user.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'}`} />
          </div>
          
          <div>
            <h3 className="font-semibold text-white">{conversation.user.name}</h3>
            <span className="text-xs text-blue-200/60 flex items-center gap-1">
              {conversation.user.status === 'online' ? 'Active now' : `Last seen ${conversation.lastMessageTime}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-blue-200/70">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Phone size={20} /></button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Video size={20} /></button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[75%] md:max-w-[60%] p-4 rounded-2xl relative shadow-lg ${
                  msg.isMe 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-none' 
                    : 'bg-white/10 text-white rounded-bl-none border border-white/5'
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                <span className={`text-[10px] absolute bottom-1 ${msg.isMe ? 'left-2 text-blue-200' : 'right-2 text-gray-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3 bg-black/20 p-2 pr-2 rounded-full border border-white/10 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/30 transition-all">
          <button className="p-2 text-white/50 hover:text-blue-400 transition-colors">
            <Paperclip size={20} />
          </button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 text-sm md:text-base h-full py-2"
          />
          
          <button className="p-2 text-white/50 hover:text-yellow-400 transition-colors">
            <Smile size={20} />
          </button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`p-3 rounded-full ${inputText.trim() ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-white/10 text-white/30 cursor-not-allowed'} transition-all`}
          >
            <Send size={18} className={inputText.trim() ? 'translate-x-0.5' : ''} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatWindow;