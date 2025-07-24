import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, MessageCircle, AlertTriangle, Download, Share2, Star } from 'lucide-react';

interface DatePlanOutputProps {
  profileData: any;
}

const DatePlanOutput: React.FC<DatePlanOutputProps> = ({ profileData }) => {
  const [connectionScore] = useState(92);
  const [showScoreDetail, setShowScoreDetail] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [showSMS, setShowSMS] = useState(false);

  const datePlan = [
    {
      time: "3:00 PM",
      title: "Art Break",
      location: "Stedelijk Museum Café",
      reason: "P2 liked 12+ modern art posts",
      spark: "You shared a Kusama exhibit—what moved you?",
      backup: "If busy, try Foam Gallery (we scanned Google Maps reviews)",
      tags: ["📍 Logistics", "💬 Connection Spark"]
    },
    {
      time: "5:30 PM",
      title: "Coffee & Conversations",
      location: "Café Central",
      reason: "Both mentioned loving deep conversations",
      spark: "What's a belief you've changed your mind about recently?",
      backup: "Alternative: Rooftop bar with city views",
      tags: ["💬 Connection Spark", "☕ Comfort Zone"]
    },
    {
      time: "7:45 PM",
      title: "Dinner Discovery",
      location: "De Kas Restaurant",
      reason: "P1's foodie vibes + P2's adventure spirit",
      spark: "Share your most memorable meal story",
      backup: "Rain backup: Cozy indoor market hall",
      tags: ["📍 Logistics", "🍽️ Experience"]
    }
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <span className="text-4xl">📅</span>
          <h1 className="text-4xl font-bold text-white">This is your date plan</h1>
          <motion.span
            className="text-2xl cursor-pointer"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.span>
        </motion.div>
      </div>

      {/* Date Plan Itinerary */}
      <div className="space-y-6 mb-8">
        {datePlan.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.2 }}
            whileHover={{ 
              scale: 1.02,
              rotateY: 2,
              rotateX: 1
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full font-bold text-sm"
                whileHover={{ scale: 1.1 }}
              >
                <Clock className="w-4 h-4 inline mr-1" />
                {item.time}
              </motion.div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span className="text-white/90">{item.location}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-white/80">
                    <span className="font-medium">🎨 Why?</span> {item.reason}
                  </p>
                  <motion.p
                    className="text-white/80 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <MessageCircle className="w-4 h-4 inline mr-2 text-blue-400" />
                    <span className="font-medium">Spark:</span> "{item.spark}"
                  </motion.p>
                  <p className="text-white/70 text-sm">
                    <AlertTriangle className="w-4 h-4 inline mr-2 text-yellow-400" />
                    <span className="font-medium">Backup:</span> {item.backup}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {item.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tag.includes('Logistics') 
                          ? 'bg-gray-500/20 text-gray-300 hover:bg-red-500/20 hover:text-red-300' 
                          : tag.includes('Connection')
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-purple-500/20 text-purple-300'
                      } transition-all cursor-pointer`}
                      whileHover={{ 
                        scale: 1.1,
                        y: tag.includes('Connection') ? [-2, 2, -2, 0] : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI-more.me Score */}
      <motion.div
        className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30 mb-8 cursor-pointer hover:border-green-400/50 transition-all"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => setShowScoreDetail(!showScoreDetail)}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              AI-more.me Score
              <motion.span
                className="text-sm bg-white/10 px-2 py-1 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Click to see why
              </motion.span>
            </h3>
            <motion.div
              className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.1 }}
            >
              {connectionScore}%
            </motion.div>
          </div>
          
          {/* Radial Progress */}
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: connectionScore / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{
                  strokeDasharray: `${2 * Math.PI * 56}`,
                  strokeDashoffset: `${2 * Math.PI * 56 * (1 - connectionScore / 100)}`
                }}
              />
              <defs>
                <linearGradient id="scoreGradient">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Emoji Explosions */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 text-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos(i * 72 * Math.PI / 180) * 40,
                  y: Math.sin(i * 72 * Math.PI / 180) * 40,
                }}
                transition={{ duration: 1, delay: 1.5 + i * 0.1 }}
              >
                {['🎉', '✨', '💘', '🌟', '🔥'][i]}
              </motion.div>
            ))}
          </div>
        </div>

        {showScoreDetail && (
          <motion.div
            className="mt-4 pt-4 border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white mb-3">Why AI-more.me thinks this is a good date:</h4>
              <div className="space-y-2">
                <p className="text-white/80 flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  Both mentioned loving deep conversations - perfect for connection
                </p>
                <p className="text-white/80 flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  Complementary personalities: P1's artsy vibes + P2\'s adventure spirit
                </p>
                <p className="text-white/80 flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  Shared interests in culture and food experiences
                </p>
                <p className="text-white/80 flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  Activity progression allows natural conversation flow
                </p>
                <p className="text-white/80 flex items-start gap-2">
                  <span className="text-blue-400">ℹ</span>
                  Based on 69 compatibility factors analyzed (nice.)
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Export Options */}
      <motion.div
        className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <h3 className="text-xl font-bold text-white mb-4">Export Your Plan</h3>
        <div className="flex gap-4">
          <motion.button
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-xl transition-all"
            onClick={() => setShowPDF(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Save as PDF
          </motion.button>
          
          <motion.button
            className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded-xl transition-all"
            onClick={() => setShowSMS(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-4 h-4" />
            Send to Phone
          </motion.button>
        </div>
      </motion.div>

      {/* Mock PDF Preview */}
      {showPDF && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowPDF(false)}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md"
            initial={{ scale: 0.8, rotateY: -90 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">📄 Date Plan Preview</h3>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">PDF Preview - Your Date Plan</span>
            </div>
            <motion.button
              className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowPDF(false)}
            >
              Download PDF
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Mock SMS Popup */}
      {showSMS && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowSMS(false)}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl p-6 max-w-sm"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <span className="text-4xl">📱</span>
              <h3 className="text-xl font-bold text-white mt-2">Send to Phone</h3>
            </div>
            <div className="bg-blue-500 text-white p-3 rounded-lg mb-4">
              <p className="text-sm">Your AI-generated date plan for tonight! 💘</p>
              <p className="text-xs mt-1 opacity-80">View full details: ai-more.me/plan/abc123</p>
            </div>
            <motion.button
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowSMS(false)}
            >
              Send SMS
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Start Over Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full"
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Plan Another Date ✨
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DatePlanOutput;