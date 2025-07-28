import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap } from 'lucide-react';

interface AIProcessingProps {
  profileData: any;
  onNext: () => void;
}

const AIProcessing: React.FC<AIProcessingProps> = ({ profileData, onNext }) => {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [brainClicks, setBrainClicks] = useState(0);
  const [showFortuneTeller, setShowFortuneTeller] = useState(false);
  const [fortuneMessage, setFortuneMessage] = useState('');
  const [requestId, setRequestId] = useState<string | null>(null);
  const [apiProgress, setApiProgress] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Mystical dating fortune messages
  const fortuneMessages = [
    "✨ The stars align for a connection deeper than words. Embrace the journey ahead.",
    "🔮 A shared laugh will unlock a hidden path to joy. Your authentic self is the key.",
    "💫 Destiny whispers... a new chapter of connection awaits. Be open to the magic.",
    "🌟 Beyond the ordinary, a spark of magic ignites your path. Trust the unexpected.",
    "💘 Your heart's true north is guiding you to an unforgettable encounter. Follow its lead.",
    "🌙 The universe conspires to bring you moments of pure connection. Be present.",
    "⚡ An exciting synchronicity is on the horizon. Prepare for delightful surprises.",
    "🎭 Your unique light will attract a kindred spirit. Shine brightly, beautiful soul.",
    "🗝️ A door to deeper understanding opens soon. Step through with courage.",
    "🌈 Two souls dancing to the same cosmic rhythm. The music is about to begin.",
    "🔥 Passion and purpose converge in your near future. Trust the divine timing.",
    "🦋 Transformation through connection awaits. Allow yourself to be wonderfully surprised."
  ];

  // Utility function to get unique and stable preview messages
  const getUniqueAndStablePreviews = (previews: string[]): string[] => {
    if (!previews || !Array.isArray(previews)) return [];
    
    const messageTypeMap = new Map<string, string>();
    const exactDuplicates = new Set<string>();
    const result: string[] = [];
    
    for (const preview of previews) {
      // Skip if we've seen this exact string before
      if (exactDuplicates.has(preview)) {
        continue;
      }
      
      // Determine message type and canonical key
      let messageType: string | null = null;
      
      if (preview.includes('personality profiles analyzed') || preview.includes('profiles analyzed')) {
        messageType = 'profile_analysis';
      } else if (preview.includes('Discovered') && preview.includes('cross-domain')) {
        messageType = 'cultural_discovery';
      } else if (preview.includes('Real compatibility calculated') || preview.includes('compatibility calculated')) {
        messageType = 'compatibility_calculation';
      } else if (preview.includes('Selected') && preview.includes('venues')) {
        messageType = 'venue_selection';
      } else if (preview.includes('perfect') && preview.includes('date plan')) {
        messageType = 'final_plan';
      }
      
      // If we identified a message type
      if (messageType) {
        // Only add if we haven't seen this type before
        if (!messageTypeMap.has(messageType)) {
          messageTypeMap.set(messageType, preview);
          result.push(preview);
          exactDuplicates.add(preview);
        }
      } else {
        // For unrecognized messages, add if not exact duplicate
        result.push(preview);
        exactDuplicates.add(preview);
      }
    }
    
    return result;
  };

  const tasks = [
    "Analyzing personality patterns...",
    "Decoding cultural cues by Qloo's API...",
    "Cross-referencing local hotspots...",
    "Calculating conversation spark potential...",
    "Optimizing for mutual weirdness by Qloo's API...",
    "Finalizing your perfect date..."
  ];

  const emojis = ['🎨', '☕', '🎶', '🎭', '🌟', '💘'];

  useEffect(() => {
    const startProcessing = async () => {
      try {
        // Start the cultural date plan processing
        const response = await fetch('https://aimor-api-8fd07f4d5603.herokuapp.com/start-cultural-date-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to start processing');
        }

        setRequestId(data.request_id);
        
        // Start polling for progress
        const pollInterval = setInterval(async () => {
          try {
            const progressResponse = await fetch(
              `https://aimor-api-8fd07f4d5603.herokuapp.com/date-plan-progress/${data.request_id}`
            );

            if (!progressResponse.ok) {
              throw new Error(`Progress polling failed: ${progressResponse.status}`);
            }

            const progressData = await progressResponse.json();
            setApiProgress(progressData);
            
            // Update UI progress
            setProgress(progressData.overall_progress || 0);
            setCurrentTask(Math.max(0, (progressData.current_step || 1) - 1));
            
            // Check if complete
            if (progressData.status === 'complete' && progressData.final_results_available) {
              clearInterval(pollInterval);
              setTimeout(() => {
                onNext(progressData);
              }, 1000);
            } else if (progressData.status === 'error') {
              clearInterval(pollInterval);
              setError('Processing failed. Please try again.');
            }
          } catch (pollError) {
            console.error('Polling error:', pollError);
            setError('Connection error. Please try again.');
            clearInterval(pollInterval);
          }
        }, 2000);

        // Cleanup function
        return () => clearInterval(pollInterval);
        
      } catch (err) {
        console.error('Failed to start processing:', err);
        setError('Failed to start processing. Please try again.');
      }
    };

    startProcessing();
  }, [profileData, onNext]);

  const handleBrainClick = () => {
    setBrainClicks(prev => prev + 1);
    if (brainClicks === 2) {
      // Select a random fortune message
      const randomFortune = fortuneMessages[Math.floor(Math.random() * fortuneMessages.length)];
      setFortuneMessage(randomFortune);
      setShowFortuneTeller(true);
      setTimeout(() => setShowFortuneTeller(false), 5000);
      setBrainClicks(0);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* AI Brain */}
      <motion.div
        className="relative mb-12 cursor-pointer"
        onClick={handleBrainClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center relative overflow-hidden"
          animate={{
            boxShadow: [
              "0 0 20px rgba(168, 85, 247, 0.4)",
              "0 0 40px rgba(236, 72, 153, 0.6)",
              "0 0 20px rgba(168, 85, 247, 0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Brain className="w-16 h-16 text-white" />
          
          {/* Neural Network Pulses */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-white/30 rounded-full"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.3, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7
              }}
            />
          ))}
        </motion.div>

        {/* Floating Data Points */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.cos(i * 45 * Math.PI / 180) * 80,
              y: Math.sin(i * 45 * Math.PI / 180) * 80,
            }}
            animate={{
              x: Math.cos(i * 45 * Math.PI / 180) * (80 + Math.sin(Date.now() / 1000) * 20),
              y: Math.sin(i * 45 * Math.PI / 180) * (80 + Math.cos(Date.now() / 1000) * 20),
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>

      {/* Processing Time Expectation */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-white/50 text-sm">
          This won't take more than 1.5 minutes
        </p>
      </motion.div>
      {/* Current Task */}
      <motion.div
        className="text-center mb-8"
        key={currentTask}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3 justify-center">
          <Zap className="w-6 h-6 text-yellow-400" />
          AI Processing
        </h2>
        <p className="text-white/80 text-lg">
          {(() => {
            const stepPreview = apiProgress?.steps?.[String(currentTask + 1)]?.preview;
            if (stepPreview) {
              // For steps 2 and 5, add Qloo API attribution
              if (currentTask === 1) { // Step 2
                return stepPreview.includes('by Qloo') ? stepPreview : `${stepPreview} by Qloo's API`;
              }
              if (currentTask === 4) { // Step 5
                return stepPreview.includes('by Qloo') ? stepPreview : `${stepPreview} by Qloo's API`;
              }
              return stepPreview;
            }
            return tasks[currentTask];
          })()}
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-8">
        <div className="bg-white/10 rounded-full h-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 relative"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          >
            {/* Emoji Confetti in Progress Bar */}
            <div className="absolute inset-0 flex items-center justify-end pr-2">
              {progress > 20 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xs"
                >
                  {emojis[Math.floor(progress / 20) - 1]}
                </motion.span>
              )}
            </div>
          </motion.div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-white/60 text-sm">Processing...</span>
          <span className="text-white/60 text-sm">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Cultural Previews */}
      {apiProgress?.cultural_previews && apiProgress.cultural_previews.length > 0 && (
        <motion.div
          className="w-full max-w-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-medium mb-4">Loading Updates</h3>
            <div className="space-y-3 min-h-[160px] max-h-[240px] overflow-y-auto">
              {getUniqueAndStablePreviews(apiProgress.cultural_previews)
                .map((preview: string, index: number) => {
                  // Process the preview text and attribution
                  let mainText = preview;
                  let attribution = '';
                  
                  // Step 1: Add OpenAI attribution for profile analysis
                  if (preview.includes('personality profiles analyzed') && !preview.includes('by OpenAI')) {
                    attribution = 'by OpenAI';
                  }
                  
                  // Step 2: Add Qloo API attribution for cultural discoveries
                  else if (preview.includes('Discovered') && preview.includes('cross-domain') && !preview.includes('by Qloo')) {
                    attribution = "by Qloo's API";
                  }
                  
                  // Step 3: Add OpenAI attribution for compatibility calculation
                  else if (preview.includes('Real compatibility calculated') && !preview.includes('by OpenAI')) {
                    attribution = 'by OpenAI';
                  }
                  
                  // Step 5: Add Qloo API attribution for venue selection
                  else if (preview.includes('Selected') && preview.includes('venues') && !preview.includes('by Qloo')) {
                    attribution = "by Qloo's API";
                  }
                  
                  return (
                    <motion.div
                      key={`${index}-${preview.substring(0, 20)}`}
                      className="text-white/70 text-sm leading-relaxed"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      layout
                    >
                      <span>{mainText}</span>
                      {attribution && (
                        <span className="text-white/40 text-xs ml-2 font-light">
                          {attribution}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Display */}
      {error && (
        <motion.div
          className="w-full max-w-md mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
            <p className="text-red-300 text-center">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Easter Egg - Music Player */}
      {/* Easter Egg - Fortune Teller */}
      {showFortuneTeller && (
        <motion.div
          className="fixed bottom-6 right-6 bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-md p-6 rounded-2xl border-2 border-yellow-400/50 shadow-2xl max-w-sm"
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 100 }}
        >
          <div className="text-center">
            <motion.div
              className="text-3xl mb-3"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔮
            </motion.div>
            <div className="text-yellow-300 font-bold text-sm mb-2 tracking-wider">
              COSMIC DATING ORACLE
            </div>
            <p className="text-white text-sm leading-relaxed font-medium">
              {fortuneMessage}
            </p>
            <motion.div
              className="mt-3 flex justify-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-yellow-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </div>
          
          {/* Mystical border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-yellow-400/30"
            animate={{
              boxShadow: [
                "0 0 20px rgba(251, 191, 36, 0.3)",
                "0 0 40px rgba(251, 191, 36, 0.6)",
                "0 0 20px rgba(251, 191, 36, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Floating sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400 text-xs"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 80}%`
                }}
                animate={{
                  y: [-5, -15, -5],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tip */}
      <motion.p
        className="text-white/50 text-sm text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Pro tip: Click the brain 3 times for a mysterious fortune 🔮
      </motion.p>
    </motion.div>
  );
};

export default AIProcessing;