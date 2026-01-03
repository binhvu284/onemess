import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';
import { ViewState } from './types';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('landing');

  const handleEnterApp = () => {
    setViewState('app');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans bg-slate-900 text-white selection:bg-blue-500/30">
      
      {/* Shared Animated Background */}
      <Background />

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {viewState === 'landing' ? (
          <motion.div
            key="landing"
            className="absolute inset-0"
            exit={{ 
              opacity: 0, 
              scale: 1.1, 
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: "easeInOut" } 
            }}
          >
            <LandingPage onEnter={handleEnterApp} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            className="absolute inset-0"
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)",
              transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } 
            }}
          >
            <ChatInterface />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;