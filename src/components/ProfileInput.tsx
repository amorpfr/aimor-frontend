import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Instagram, Sparkles, CheckCircle, AlertCircle, Shuffle, Lock } from 'lucide-react';

interface ProfileInputProps {
  profileData: any;
  updateProfileData: (data: any) => void;
  onNext: () => void;
  onBack?: () => void;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ profileData, updateProfileData, onNext, onBack }) => {
  const [person1Data, setPerson1Data] = useState(profileData.person1);
  const [person2Data, setPerson2Data] = useState(profileData.person2);
  const [activeTab, setActiveTab] = useState<'person1' | 'person2'>('person1');
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

  const handleSubmit = () => {
    if (!person1Data.description || !person2Data.description) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    updateProfileData({ person1: person1Data, person2: person2Data });
    onNext();
  };

  const useFakeProfile = (person: 'person1' | 'person2') => {
    const profile = fakeProfiles[person];
    if (person === 'person1') {
      setPerson1Data(prev => ({ ...prev, ...profile }));
    } else {
      setPerson2Data(prev => ({ ...prev, ...profile }));
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Tab Content */}
      <div className="max-w-2xl mx-auto">
        {/* Person 1 Tab */}
        {activeTab === 'person1' && (
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          key="person1"
        >
          {/* Title inside card */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Tell us about yourselves
            </h1>
          </div>

          {/* Tab Navigation inside card */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/5 rounded-xl p-1 border border-white/10">
              <div className="flex gap-1">
                <motion.button
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === 'person1'
                      ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setActiveTab('person1')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Yourself
                </motion.button>
                <motion.button
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === 'person2'
                      ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setActiveTab('person2')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Your Date
                </motion.button>
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

          {/* Image Upload */}
          <div className="mb-4 md:mb-6">
            <label className="block text-white/90 font-medium mb-3">
              Dating Profile Photos (Optional)
            </label>
            <motion.div
              className={`relative border-2 border-dashed ${dragActive ? 'border-pink-400 bg-pink-400/10' : 'border-white/30'} rounded-xl p-8 text-center cursor-pointer transition-all`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                // Handle file drop
              }}
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.02 }}
            >
              <Upload className="w-5 h-5 md:w-8 md:h-8 text-white/60 mx-auto mb-1 md:mb-3" />
              <p className="text-white/80 text-xs md:text-base">Upload photos (optional)</p>
              <p className="text-white/50 text-xs md:text-sm mt-1 hidden md:block">or click to browse</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  // Handle file upload
                }}
                multiple
              />
            </motion.div>
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-white/90 font-medium mb-3">
              Instagram Handle (Coming Soon)
            </label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/30" />
              <input
                type="text"
                className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 md:pl-12 pr-4 py-2 md:py-3 text-sm md:text-base text-white/50 placeholder-white/30 cursor-not-allowed transition-all"
                placeholder="@username"
                value=""
                disabled
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30" />
            </div>
            <p className="text-white/40 text-xs md:text-sm mt-2">Feature coming soon!</p>
          </div>
        </motion.div>
        )}

        {/* Person 2 Tab */}
        {activeTab === 'person2' && (
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-8 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          key="person2"
        >
          {/* Title inside card */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Tell us about yourselves
            </h1>
          </div>

          {/* Tab Navigation inside card */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/5 rounded-xl p-1 border border-white/10">
              <div className="flex gap-1">
                <motion.button
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === 'person1'
                      ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setActiveTab('person1')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Yourself
                </motion.button>
                <motion.button
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === 'person2'
                      ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setActiveTab('person2')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Your Date
                </motion.button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4 md:mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-white/90 font-medium">
                Describe your date
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
              placeholder="E.g., 'Adventurous 30M who thinks ramen is a personality trait'"
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

          {/* Image Upload */}
          <div className="mb-4 md:mb-6">
            <label className="block text-white/90 font-medium mb-3">
              Dating Profile Photos (Optional)
            </label>
            <motion.div
              className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-400/10 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <Upload className="w-5 h-5 md:w-8 md:h-8 text-white/60 mx-auto mb-1 md:mb-3" />
              <p className="text-white/80 text-xs md:text-base">Upload photos (optional)</p>
              <p className="text-white/50 text-xs md:text-sm mt-1 hidden md:block">or click to browse</p>
            </motion.div>
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-white/90 font-medium mb-3">
              Instagram Handle (Coming Soon)
            </label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/30" />
              <input
                type="text"
                className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 md:pl-12 pr-4 py-2 md:py-3 text-sm md:text-base text-white/50 placeholder-white/30 cursor-not-allowed transition-all"
                placeholder="@username"
                value=""
                disabled
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30" />
            </div>
            <p className="text-white/40 text-xs md:text-sm mt-2">Feature coming soon!</p>
          </div>
        </motion.div>
        )}
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
            <span className="font-medium">Please fill in info for both people</span>
          </div>
        </motion.div>
      )}

      {/* Continue Button */}
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
            Next: Customize Date
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💘
            </motion.span>
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
        
        {/* Back Button */}
        {onBack && (
          <motion.button
            className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors text-sm mx-auto"
            onClick={onBack}
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">←</span>
            Back
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProfileInput;