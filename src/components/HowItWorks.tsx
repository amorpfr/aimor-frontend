import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Heart, Calendar, MapPin, Sparkles, Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface HowItWorksProps {
  onBack: () => void;
  onDemo?: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onBack, onDemo }) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const steps = [
    {
      number: 1,
      title: "Profile Analyzer",
      subtitle: "OpenAI",
      icon: <Brain className="w-6 h-6" />,
      description: "Extracts psychology, personality, and taste from the profile texts.",
      details: [
        "OCR converts screenshots to text (if needed)",
        "GPT-4 extracts Big Five traits, attachment style, tone, values",
        "Turns casual bios into structured personality data"
      ],
      code: `{
  "profile_1": {
    "openness": 0.9,
    "extraversion": 0.3,
    "interests": ["indie movies", "vinyl", "literature"],
    "style": "introspective, artistic"
  },
  "profile_2": {
    "openness": 0.8,
    "extraversion": 0.7,
    "interests": ["street food", "art shows", "bookshops"],
    "style": "playful, curious"
  }
}`,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: 2,
      title: "Cultural Enhancer",
      subtitle: "Qloo",
      icon: <Sparkles className="w-6 h-6" />,
      description: "Enhances profiles with cross-domain cultural knowledge.",
      details: [
        "Qloo searches across music, food, events, books",
        "Translates interests into real-world cultural tags",
        "Finds high-signal cultural entities (places, activities)"
      ],
      code: `{
  "enhanced_interests": {
    "profile_1": ["Murakami novels", "Art house cinemas", "Lo-fi vinyl cafes"],
    "profile_2": ["Food trucks", "Zine markets", "Indie book fairs"]
  }
}`,
      color: "from-blue-500 to-purple-500"
    },
    {
      number: 3,
      title: "Compatibility Engine",
      subtitle: "OpenAI",
      icon: <Heart className="w-6 h-6" />,
      description: "Analyzes shared values and complementary differences.",
      details: [
        "Cross-checks values, personality types (e.g., INFJ + ENFP)",
        "Evaluates shared themes (e.g., \"meaningful conversations\")",
        "Suggests thematic match: \"Creative Depth + Playful Discovery\""
      ],
      code: `{
  "compatibility_score": 0.76,
  "shared_values": ["curiosity", "intellectual connection"],
  "theme": "Moody Art & Meaningful Food"
}`,
      color: "from-pink-500 to-red-500"
    },
    {
      number: 4,
      title: "Date Generator",
      subtitle: "OpenAI",
      icon: <Calendar className="w-6 h-6" />,
      description: "Generates a cultural, emotionally intelligent date plan.",
      details: [
        "Uses interests, compatibility, and city context (e.g., Amsterdam)",
        "Crafts a smooth date flow: discovery → intimacy",
        "Picks formats that match social energy and timing"
      ],
      code: `{
  "plan": [
    "Start at Foam Photography Museum for moody exhibits",
    "Stroll through the Nine Streets bookshops and cafés",
    "Grab ramen and jazz at a cozy canal-side spot"
  ]
}`,
      color: "from-green-500 to-blue-500"
    },
    {
      number: 5,
      title: "Venue Finder",
      subtitle: "Qloo",
      icon: <MapPin className="w-6 h-6" />,
      description: "Finds specific, live venues matching the plan and profiles.",
      details: [
        "Qloo locates real Amsterdam venues with matching tags",
        "Checks hours, backup options, price, location logic",
        "Returns ready-to-use venue picks"
      ],
      code: `{
  "venues": [
    {"name": "Foam", "type": "museum", "address": "Keizersgracht 609"},
    {"name": "The American Book Center", "type": "bookshop"},
    {"name": "Jazz Ramen", "type": "restaurant", "backup": "Takumi Amsterdam"}
  ]
}`,
      color: "from-teal-500 to-green-500"
    },
    {
      number: 6,
      title: "Final Curator",
      subtitle: "OpenAI",
      icon: <Brain className="w-6 h-6" />,
      description: "Creates a complete date plan with routes, costs, timing, and personal touches.",
      details: [
        "Calculates routes, walking distances, and transportation needs",
        "Estimates costs, timing, and practical logistics",
        "Adds personality-driven commentary and emotional context",
        "Formats everything into a polished, shareable date plan"
      ],
      code: `"Looking for something soulful and surprising?
Start at Foam for visual storytelling, then meander 
through Nine Streets to find quirky books and café vibes. 
Cap it off with ramen and jazz — a perfect blend of 
meaning and mood.

💰 Total cost: €55-75 for two
🚶‍♀️ Walking: 1.5km (15 min total)
⏰ Duration: 4 hours"`,
      color: "from-orange-500 to-red-500"
    }
  ];

  const toggleStep = (stepNumber: number) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <span className="text-4xl">🧠</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            How DateGPT Works
          </h1>
        </motion.div>
        
        <motion.p
          className="text-xl text-white/90 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          In 6 Smart Steps
        </motion.p>
        
        <motion.p
          className="text-lg text-white/70 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          From two text profiles to a culturally intelligent date plan
        </motion.p>

        <motion.div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-white/80">Text or images</span>
          <span className="text-white/60">→</span>
          <span className="text-white/80">psychology</span>
          <span className="text-white/60">→</span>
          <span className="text-white/80">culture</span>
          <span className="text-white/60">→</span>
          <span className="text-white/80">curated date</span>
        </motion.div>
      </div>

      {/* Example Input */}
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Example Input: Two Tinder Profiles</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-pink-400/30">
            <h3 className="text-lg font-bold text-pink-300 mb-3">Profile 1:</h3>
            <p className="text-white/90 italic">
              "I'm into vinyl records, indie movies, moody cafés, and reading Murakami. 
              INFJ if you're into that. Looking for something meaningful."
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-blue-400/30">
            <h3 className="text-lg font-bold text-blue-300 mb-3">Profile 2:</h3>
            <p className="text-white/90 italic">
              "Weekend explorer. Love street food, underground art shows, and wandering bookshops. 
              ENFP, and yes, I will challenge you to a deep convo."
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <p className="text-white/70 text-sm">
            <span className="font-medium">💡 Input Format:</span> Simple text descriptions work perfectly. Premium features like image uploads coming soon!
          </p>
        </div>
      </motion.div>

      {/* 7-Step Pipeline */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <span className="text-2xl">🚀</span>
            6-Step Cultural Intelligence Pipeline
          </h2>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <motion.button
                className="w-full p-6 text-left hover:bg-white/5 transition-all"
                onClick={() => toggleStep(step.number)}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.number}
                    </motion.div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="text-white">{step.icon}</div>
                        <h3 className="text-xl font-bold text-white">
                          Step {step.number}: {step.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${step.color} text-white`}>
                          {step.subtitle}
                        </span>
                      </div>
                      <p className="text-white/80">{step.description}</p>
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: expandedStep === step.number ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-white/60" />
                  </motion.div>
                </div>
              </motion.button>

              {expandedStep === step.number && (
                <motion.div
                  className="px-6 pb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="text-lg font-semibold text-white mb-4">What happens:</h4>
                    
                    <ul className="space-y-2 mb-6">
                      {step.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detailIndex}
                          className="text-white/80 flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: detailIndex * 0.1 }}
                        >
                          <span className="text-green-400 mt-1">•</span>
                          {detail}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                      <h5 className="text-sm font-medium text-white/70 mb-3">Example Output:</h5>
                      <pre className="text-sm text-green-300 font-mono overflow-x-auto whitespace-pre-wrap">
                        {step.code}
                      </pre>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* See Result Example Button */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
      >
        <motion.button
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 px-8 rounded-full text-lg relative overflow-hidden group"
          onClick={() => {
            onDemo?.();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            See Example Result
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </motion.div>

      {/* Back Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mx-auto"
          onClick={onBack}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">←</span>
          Back to App
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HowItWorks;