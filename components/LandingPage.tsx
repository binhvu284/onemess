import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Shield, Zap } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { 
    opacity: 0,
    scale: 1.1, 
    filter: "blur(10px)",
    transition: { duration: 0.5 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 50 }
  }
};

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <motion.div 
      className="relative z-20 flex flex-col items-center justify-center h-screen w-full px-6 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Decorative Icon */}
      <motion.div variants={itemVariants} className="mb-8 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
        <MessageSquare size={48} className="text-blue-400" />
      </motion.div>

      {/* Main Title */}
      <motion.h1 
        variants={itemVariants} 
        className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-blue-200 mb-6 drop-shadow-sm"
      >
        Connect Beyond <br/> Limits
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        variants={itemVariants} 
        className="text-lg md:text-xl text-blue-100/70 max-w-xl mb-10 leading-relaxed"
      >
        Experience the next generation of messaging. 
        Fluid, secure, and beautifully designed for the modern web.
      </motion.p>

      {/* Features Grid (Small) */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
        {[
          { icon: Zap, text: "Lightning Fast" },
          { icon: Shield, text: "Secure by Design" },
          { icon: MessageSquare, text: "Rich Media" }
        ].map((feat, idx) => (
          <div key={idx} className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <feat.icon size={20} className="text-blue-300" />
            <span className="text-sm font-medium text-white/80">{feat.text}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onEnter}
        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-semibold text-lg shadow-xl overflow-hidden"
      >
        <span className="relative z-10 flex items-center space-x-2">
          <span>Enter App</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-white/20 blur-lg group-hover:opacity-100 opacity-0 transition-opacity" />
      </motion.button>
    </motion.div>
  );
};

export default LandingPage;