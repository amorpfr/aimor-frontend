import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Instagram, Sparkles, CheckCircle, AlertCircle, Shuffle, Lock, ArrowLeft } from 'lucide-react';

interface ProfileInputProps {
  profileData: any;
  updateProfileData: (data: any) => void;
  onNext: () => void;
  onBack?: () => void;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ profileData, updateProfileData, onNext, onBack }) => {
  const [person1Data, setPerson1Data] = useState({
    description: profileData.person1?.description || '',
    instagram: profileData.person1?.instagram || '',
    vibes: profileData.person1?.vibes || [],
    image_data: null as string | null
  });
  const [person2Data, setPerson2Data] = useState({
    description: profileData.person2?.description || '',
    instagram: profileData.person2?.instagram || '',
    vibes: profileData.person2?.vibes || [],
    image_data: null as string | null
  });
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [dragActive, setDragActive] = useState(false);
  const [aiScanning, setAiScanning] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fakeProfiles = {
    person1: {
      description: "28F Amsterdam local, museum hopper by day, karaoke queen by night. Coffee addict who thinks art galleries are the perfect first date spot.",
      instagram: "",
      vibes: []
    },
    person2: {
      description: "30M Amsterdam foodie who knows every hidden restaurant. Adventure seeker who loves weekend bike trips through the canals and trying new cuisines.",
      instagram: "",
      vibes: []
    }
  };

  const detectVibes = (description: string) => {
    const keywords = {
      'museum': '🎨 Artsy',
      'karaoke': '🎤 Fun-loving',
      'coffee': '☕ Caffeine Addict',
      'adventure': '🏔️ Adventurous',
      'books': '📚 Intellectual',
      'music': '🎵 Music Lover',
      'travel': '✈️ Wanderlust',
      'food': '🍕 Foodie'
    };

    const vibes: string[] = [];
    Object.entries(keywords).forEach(([key, vibe]) => {
      if (description.toLowerCase().includes(key)) {
        vibes.push(vibe);
      }
    });

    return vibes;
  };

  const handleDescriptionChange = (person: 'person1' | 'person2', value: string) => {
    const vibes = detectVibes(value);
    const updatedData = { description: value, vibes };
    
    if (person === 'person1') {
      setPerson1Data(prev => ({ ...prev, ...updatedData }));
    } else {
      setPerson2Data(prev => ({ ...prev, ...updatedData }));
    }

    if (value.length > 10) {
      setAiScanning(true);
      setTimeout(() => setAiScanning(false), 1500);
    }
  };

  const handleInstagramChange = (person: 'person1' | 'person2', value: string) => {
    const updatedData = { instagram: value };
    if (person === 'person1') {
      setPerson1Data(prev => ({ ...prev, ...updatedData }));
    } else {
      setPerson2Data(prev => ({ ...prev, ...updatedData }));
    }
  };

  const handleImageUpload = (person: 'person1' | 'person2', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Remove the data:image/...;base64, prefix to get just the base64 string
      const base64String = result.split(',')[1];
      
      if (person === 'person1') {
        setPerson1Data(prev => ({ ...prev, image_data: base64String }));
      } else {
        setPerson2Data(prev => ({ ...prev, image_data: base64String }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (currentStep === 1) {
      // Step 1: Validate person1 data and move to step 2
      if (!person1Data.description) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }
      setCurrentStep(2);
    } else {
      // Step 2: Validate person2 data and proceed to next screen
      if (!person2Data.description) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }
      
      // Update both API format and legacy format for UI compatibility
      updateProfileData({ 
        profile_a: {
          text: person1Data.description,
          image_data: person1Data.image_data
        },
        profile_b: {
          text: person2Data.description,
          image_data: person2Data.image_data
        },
        // Keep legacy format for UI compatibility
        person1: {
          description: person1Data.description,
          instagram: person1Data.instagram,
          vibes: person1Data.vibes
        },
        person2: {
          description: person2Data.description,
          instagram: person2Data.instagram,
          vibes: person2Data.vibes
        }
      });
      onNext();
    }
  };

  const useFakeProfile = (person: 'person1' | 'person2') => {
    const profile = fakeProfiles[person];
    if (person === 'person1') {
      setPerson1Data(prev => ({ ...prev, ...profile }));
    } else {
      setPerson2Data(prev => ({ ...prev, ...profile }));
    }
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Step 1: Your Profile */}
          {currentStep === 1 && (
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-8 border border-pink-400/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              key="step1"
            >
              {/* Title */}
              <div className="text-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  Tell us about yourself
                </h1>
                <p className="text-white/70 text-sm mt-2">
                  Start by describing your own profile
                </p>
              </div>

              {/* Step Indicator */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div className="w-12 h-1 bg-white/20 rounded-full">
                    <div className="w-full h-full bg-pink-500 rounded-full"></div>
                  </div>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white/50 font-bold text-sm">
                    2
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white/90 font-medium">
                    Describe yourself
                  </label>
                  <motion.button
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-2 py-1 md:px-3 md:py-2 rounded-lg text-xs md:text-sm transition-all"
                    onClick={() => useFakeProfile('person1')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Shuffle className="w-3 h-3 md:w-4 md:h-4" />
                    Try example
                  </motion.button>
                </div>
                <textarea
                  className="w-full h-24 md:h-32 bg-white/5 border border-white/20 rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white placeholder-white/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all resize-none"
                  placeholder="E.g., '28F, secretly loves bad karaoke, museum hopper'"
                  value={person1Data.description}
                  onChange={(e) => handleDescriptionChange('person1', e.target.value)}
                  maxLength={200}
                />
                <div className="flex justify-end mt-2">
                  <span className={`text-sm ${person1Data.description.length > 180 ? 'text-red-400' : 'text-white/60'}`}>
                    {person1Data.description.length}/200
                  </span>
                </div>
              </div>

              {/* Premium Features Coming Soon */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 md:p-6 border border-yellow-400/30">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-bold text-yellow-300">Premium Features Coming Soon</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Dating Profile Photos */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-white/50" />
                        <span className="text-white/70 font-medium text-sm">Dating Profile Photos</span>
                      </div>
                      <Lock className="w-4 h-4 text-white/30" />
                    </div>
                    <p className="text-white/50 text-xs">Upload multiple photos for better AI analysis</p>
                  </div>

                  {/* Instagram Handle */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-white/50" />
                        <span className="text-white/70 font-medium text-sm">Instagram Integration</span>
                      </div>
                      <Lock className="w-4 h-4 text-white/30" />
                    </div>
                    <p className="text-white/50 text-xs">Connect Instagram for deeper personality insights</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Other Person's Profile */}
          {currentStep === 2 && (
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-8 border border-blue-400/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              key="step2"
            >
              {/* Title */}
              <div className="text-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  Now, tell us about your potential date
                </h1>
                <p className="text-white/70 text-sm mt-2">
                  This section is for details about the <strong>person</strong> you're going on a date with, not the type of date you want to plan. Think about their dating profile or what you know about them.
                </p>
              </div>

              {/* Step Indicator */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    ✓
                  </div>
                  <div className="w-12 h-1 bg-pink-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white/90 font-medium">
                    Describe the person you're going on a date with
                  </label>
                  <motion.button
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-2 py-1 md:px-3 md:py-2 rounded-lg text-xs md:text-sm transition-all"
                    onClick={() => useFakeProfile('person2')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Shuffle className="w-3 h-3 md:w-4 md:h-4" />
                    Try example
                  </motion.button>
                </div>
                <textarea
                  className="w-full h-24 md:h-32 bg-white/5 border border-white/20 rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all resize-none"
                  placeholder="E.g., 'Adventurous 30M who loves street food and indie bookshops'"
                  value={person2Data.description}
                  onChange={(e) => handleDescriptionChange('person2', e.target.value)}
                  maxLength={200}
                />
                <div className="flex justify-end mt-2">
                  <span className={`text-sm ${person2Data.description.length > 180 ? 'text-red-400' : 'text-white/60'}`}>
                    {person2Data.description.length}/200
                  </span>
                </div>
              </div>

              {/* Premium Features Coming Soon */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 md:p-6 border border-yellow-400/30">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-bold text-yellow-300">Premium Features Coming Soon</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Dating Profile Photos */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-white/50" />
                        <span className="text-white/70 font-medium text-sm">Dating Profile Photos</span>
                      </div>
                      <Lock className="w-4 h-4 text-white/30" />
                    </div>
                    <p className="text-white/50 text-xs">Upload multiple photos for better AI analysis</p>
                  </div>

                  {/* Instagram Handle */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-white/50" />
                        <span className="text-white/70 font-medium text-sm">Instagram Integration</span>
                      </div>
                      <Lock className="w-4 h-4 text-white/30" />
                    </div>
                    <p className="text-white/50 text-xs">Connect Instagram for deeper personality insights</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500/90 backdrop-blur-md text-white px-6 py-3 rounded-xl border border-red-400/30 z-50"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">
              {currentStep === 1 ? "Please describe yourself first" : "Please describe the other person"}
            </span>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        className="text-center mt-6 md:mt-12 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.button
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full text-base md:text-lg relative overflow-hidden group"
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            {currentStep === 1 ? "Next: Describe Your Date" : "Generate Date Plan"}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {currentStep === 1 ? "👤" : "💘"}
            </motion.span>
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
        
        {/* Back Buttons */}
        <div className="flex justify-center gap-4">
          {currentStep === 2 && (
            <motion.button
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              onClick={goBackToStep1}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Your Profile
            </motion.button>
          )}
          
          {onBack && currentStep === 1 && (
            <motion.button
              className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors text-sm"
              onClick={onBack}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">←</span>
              Back
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileInput;