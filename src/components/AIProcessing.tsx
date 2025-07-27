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
  const [playingMusic, setPlayingMusic] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [apiProgress, setApiProgress] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const tasks = [
    "Analyzing personality patterns...",
    "Decoding cultural cues from P2's meme stash by Qloo's API...",
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
      setPlayingMusic(true);
      setTimeout(() => setPlayingMusic(false), 3000);
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
          {apiProgress?.steps?.[String(currentTask + 1)]?.preview || tasks[currentTask]}
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
            <div className="space-y-2 min-h-[160px] max-h-[240px] overflow-y-auto">
              {apiProgress.cultural_previews.map((preview: string, index: number) => (
                <motion.p
                  key={index}
                  className="text-white/70 text-sm leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0, duration: 0.3 }}
                  layout
                >
                  {preview}
                </motion.p>
              ))}
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
      {playingMusic && (
        <motion.div
          className="fixed bottom-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/20"
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 100 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <span className="text-white text-sm">🎵 Careless Whisper (8-bit)</span>
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
        Pro tip: Click the brain 3 times for a surprise 🎵
      </motion.p>

      {/* Processing Time Footer */}
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <p className="text-white/40 text-xs">
          This won't take more than 1.5 minutes
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AIProcessing;