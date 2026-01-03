import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, Plus } from 'lucide-react';
import { Conversation } from '../types';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ conversations, activeId, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(c => 
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full md:w-[350px] flex flex-col h-full bg-white/5 backdrop-blur-2xl md:rounded-l-3xl border-r border-white/5"
    >
      {/* Sidebar Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Chats</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 transition-colors">
               <Plus size={20} />
            </button>
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 transition-colors">
               <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 custom-scrollbar">
        {filteredConversations.map((chat, idx) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onSelect(chat.id)}
            className={`p-3 rounded-2xl cursor-pointer transition-all border border-transparent ${
              activeId === chat.id 
                ? 'bg-blue-600/20 border-blue-500/30 shadow-lg shadow-blue-900/10' 
                : 'hover:bg-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full object-cover" />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1e293b] ${chat.user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-semibold truncate ${activeId === chat.id ? 'text-white' : 'text-white/90'}`}>
                    {chat.user.name}
                  </h3>
                  <span className={`text-xs ${activeId === chat.id ? 'text-blue-200' : 'text-white/40'}`}>
                    {chat.lastMessageTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-sm truncate pr-2 ${activeId === chat.id ? 'text-blue-100/80' : 'text-white/50'}`}>
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-lg shadow-blue-500/40">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;