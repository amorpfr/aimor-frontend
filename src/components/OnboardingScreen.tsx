import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, User } from 'lucide-react';

interface OnboardingScreenProps {
  onNext: () => void;
  onDemo?: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onNext, onDemo }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsConnected(true), 2000);
    const timer2 = setTimeout(() => setShowCTA(true), 3000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Illustration */}
      <div className="relative mb-12">
        <motion.div className="flex items-center justify-center space-x-4 md:space-x-8">
          {/* Person 1 */}
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <User className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </motion.div>

          {/* Neural Network Line */}
          <motion.div className="relative">
            <svg width="80" height="30" className="overflow-visible md:w-[120px] md:h-[40px]">
              <motion.path
                d="M 0 15 Q 40 0 80 15"
                className="md:hidden"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isConnected ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M 0 20 Q 60 0 120 20"
                className="hidden md:block"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isConnected ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Spark Animation */}
            {isConnected && (
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-yellow-400" />
              </motion.div>
            )}
          </motion.div>

          {/* Person 2 */}
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <User className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </motion.div>
        </motion.div>

        {/* Floating Emojis */}
        {isConnected && (
          <div className="absolute inset-0">
            {['✨', '💬', '🎨', '💘', '🌟'].map((emoji, index) => (
              <motion.div
                key={index}
                className="absolute text-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.cos(index * 72 * Math.PI / 180) * 100,
                  y: Math.sin(index * 72 * Math.PI / 180) * 100,
                }}
                transition={{ duration: 2, delay: index * 0.2 }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          <motion.span
            className="inline-block bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05, textShadow: "0 0 20px rgba(236, 72, 153, 0.5)" }}
          >
            AI-More.me
          </motion.span>
        </h1>
        
        <p className="text-xl text-white/90 mb-2">Your date, designed for connection.</p>
        <p className="text-base md:text-lg text-white/70 mb-12">AI that plays Cupid to craft your perfect date</p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {/* Primary CTA */}
        <motion.button
          className="relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full text-lg overflow-hidden group"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            Design Your Date
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-5 h-5" />
            </motion.div>
          </span>

          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full scale-0"
            whileTap={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Demo Button */}
      </motion.div>

      {/* AI Provider Info */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <p className="text-white/40 text-xs">
          Powered by{' '}
          <a 
            href="https://qloo.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors underline"
          >
            Insights by Qloo
          </a>
          {' • Powered by '}
          <a 
            href="https://openai.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors underline"
          >
            OpenAI
          </a>
        </p>
      </motion.div>

      {/* Demo Link - Footer Position */}
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <motion.button
          className="text-white/40 hover:text-white/60 transition-colors text-xs underline"
          onClick={onDemo}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View demo result
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingScreen;