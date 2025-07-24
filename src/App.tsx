import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingScreen from './components/OnboardingScreen';
import ProfileInput from './components/ProfileInput';
import DateCustomization from './components/DateCustomization';
import AIProcessing from './components/AIProcessing';
import DatePlanOutput from './components/DatePlanOutput';
import HowItWorks from './components/HowItWorks';

type Screen = 'onboarding' | 'profile' | 'customization' | 'processing' | 'output' | 'how-it-works';

interface ProfileData {
  person1: {
    description: string;
    image?: File;
    instagram: string;
    vibes: string[];
  };
  person2: {
    description: string;
    image?: File;
    instagram: string;
    vibes: string[];
  };
  dateType: string;
  location: string;
  weather: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [profileData, setProfileData] = useState<ProfileData>({
    person1: { description: '', instagram: '', vibes: [] },
    person2: { description: '', instagram: '', vibes: [] },
    dateType: '',
    location: '',
    weather: ''
  });
  const [logoClicks, setLogoClicks] = useState(0);
  const [godMode, setGodMode] = useState(false);

  // God Mode Easter Egg
  useEffect(() => {
    if (logoClicks >= 5) {
      setGodMode(true);
      setTimeout(() => setGodMode(false), 3000);
      setLogoClicks(0);
    }
  }, [logoClicks]);

  const nextScreen = () => {
    const screenOrder: Screen[] = ['onboarding', 'profile', 'customization', 'processing', 'output'];
    const currentIndex = screenOrder.indexOf(currentScreen);
    if (currentIndex < screenOrder.length - 1) {
      setCurrentScreen(screenOrder[currentIndex + 1]);
    }
  };

  const prevScreen = () => {
    const screenOrder: Screen[] = ['onboarding', 'profile', 'customization', 'processing', 'output'];
    const currentIndex = screenOrder.indexOf(currentScreen);
    if (currentIndex > 0) {
      setCurrentScreen(screenOrder[currentIndex - 1]);
    }
  };

  const goToStart = () => {
    setCurrentScreen('onboarding');
  };

  const goToHowItWorks = () => {
    setCurrentScreen('how-it-works');
  };

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-600 to-green-600 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, #D32F2F 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, #2E7D32 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, #D32F2F 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['✨', '💬', '🎨', '💘', '🌟'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 p-6 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            setLogoClicks(prev => prev + 1);
            goToStart();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white font-bold text-xl">AI-More.me</span>
        </motion.div>

        {godMode && (
          <motion.div
            className="absolute top-16 left-6 bg-black/80 text-white px-4 py-2 rounded-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            🔓 God Mode Activated! Swipe anywhere to see magic ✨
          </motion.div>
        )}

        <nav className="hidden md:flex space-x-6">
          <motion.button
            className="text-white/80 hover:text-white transition-colors"
            onClick={goToHowItWorks}
            whileHover={{ scale: 1.05 }}
          >
            How it works
          </motion.button>
        </nav>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden">
          <motion.button
            className="text-white/80 hover:text-white transition-colors text-sm"
            onClick={goToHowItWorks}
            whileHover={{ scale: 1.05 }}
          >
            How it works
          </motion.button>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentScreen === 'onboarding' && (
            <OnboardingScreen key="onboarding" onNext={nextScreen} />
          )}
          {currentScreen === 'profile' && (
            <ProfileInput
              key="profile"
              profileData={profileData}
              updateProfileData={updateProfileData}
              onNext={nextScreen}
              onBack={prevScreen}
            />
          )}
          {currentScreen === 'customization' && (
            <DateCustomization
              key="customization"
              profileData={profileData}
              updateProfileData={updateProfileData}
              onNext={nextScreen}
              onBack={prevScreen}
            />
          )}
          {currentScreen === 'processing' && (
            <AIProcessing key="processing" onNext={nextScreen} />
          )}
          {currentScreen === 'output' && (
            <DatePlanOutput key="output" profileData={profileData} />
          )}
          {currentScreen === 'how-it-works' && (
            <HowItWorks key="how-it-works" onBack={goToStart} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;