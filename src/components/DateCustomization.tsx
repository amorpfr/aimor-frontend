import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Cloud, Sun, Lock, Smile, Clock } from 'lucide-react';

interface DateCustomizationProps {
  profileData: any;
  updateProfileData: (data: any) => void;
  onNext: () => void;
  onBack?: () => void;
}

const DateCustomization: React.FC<DateCustomizationProps> = ({ profileData, updateProfileData, onNext, onBack }) => {
  const [dateType, setDateType] = useState(profileData.dateType || '');
  const [location, setLocation] = useState(profileData.location || '');
  const [timeOfDay, setTimeOfDay] = useState(profileData.time_of_day || '');
  const [duration, setDuration] = useState(profileData.duration || '');
  const [weather, setWeather] = useState(profileData.season || '');
  const [lockShakes, setLockShakes] = useState(0);

  const dateTypes = [
    { id: 'first', label: 'First Date', icon: '💘', description: 'Nervous butterflies welcome' },
    { id: 'anniversary', label: 'Anniversary', icon: '🎉', description: 'Celebrate your journey' },
    { id: 'casual', label: 'Casual Hangout', icon: '😊', description: 'Low pressure, high fun' },
    { id: 'special', label: 'Special Occasion', icon: '✨', description: 'Make it memorable' }
  ];

  const timeOptions = [
    { id: 'morning', label: 'Morning (9-12)', icon: '🌅' },
    { id: 'afternoon', label: 'Afternoon (12-17)', icon: '☀️' },
    { id: 'evening', label: 'Evening (17-21)', icon: '🌆' }
  ];

  const durationOptions = [
    { id: '2-3', label: '2-3 hours', icon: '⏰' },
    { id: '4-5', label: '4-5 hours', icon: '🕐' },
    { id: '6-8', label: '6-8 hours', icon: '🕕' },
    { id: 'full-day', label: 'Full day', icon: '🌅🌙' }
  ];

  const weatherOptions = [
    { id: 'sunny', label: 'Sunny', icon: '☀️', color: 'from-yellow-400 to-orange-500' },
    { id: 'cloudy', label: 'Cloudy', icon: '☁️', color: 'from-gray-400 to-gray-600' },
    { id: 'rainy', label: 'Rainy', icon: '🌧️', color: 'from-blue-400 to-indigo-600' },
    { id: 'snowy', label: 'Snowy', icon: '❄️', color: 'from-blue-200 to-white' },
    { id: 'unknown', label: "I don't know", icon: '🤷', color: 'from-purple-400 to-pink-500' }
  ];

  const handleSubmit = () => {
    updateProfileData({
      context: {
        location,
        time_of_day: timeOfDay,
        duration,
        date_type: dateType
      }
    });
    onNext();
  };

  const handleLockClick = () => {
    setLockShakes(prev => prev + 1);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-12"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          Set the Scene for Your Perfect Date
        </motion.h1>
        <p className="text-white/80 text-lg">Tell us a bit about your ideal setting</p>
      </div>

      {/* Location Input */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <MapPin className="w-6 h-6" />
          Location
        </h2>
        <div className="mb-6">
          <input
            type="text"
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
            placeholder="e.g., Amsterdam, Netherlands or Rotterdam area, Netherlands"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <p className="text-white/60 text-sm mt-2">
            Be descriptive! City, country, or specific area works great
          </p>
        </div>
      </div>

      {/* Date Type Selection */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Date Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dateTypes.map((type) => (
            <motion.button
              key={type.id}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                dateType === type.id
                  ? 'border-yellow-400 bg-yellow-400/20 text-white'
                  : 'border-white/20 bg-white/5 text-white/80 hover:border-yellow-400/60 hover:bg-yellow-400/10'
              }`}
              onClick={() => setDateType(type.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4 mb-2">
                <motion.span
                  className="text-3xl"
                  animate={dateType === type.id ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {type.icon}
                </motion.span>
                <h3 className="text-xl font-bold">{type.label}</h3>
              </div>
              <p className="text-sm opacity-80">{type.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time of Day */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Clock className="w-6 h-6" />
          Time of Day
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {timeOptions.map((time) => (
            <motion.button
              key={time.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                timeOfDay === time.id
                  ? 'border-yellow-400 bg-yellow-400/20 text-white'
                  : 'border-white/20 bg-white/5 text-white/80 hover:border-yellow-400/60 hover:bg-yellow-400/10'
              }`}
              onClick={() => setTimeOfDay(time.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-3xl mb-2">{time.icon}</div>
              <div className="font-medium text-sm">{time.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Calendar className="w-6 h-6" />
          Duration
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {durationOptions.map((dur) => (
            <motion.button
              key={dur.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                duration === dur.id
                  ? 'border-yellow-400 bg-yellow-400/20 text-white'
                  : 'border-white/20 bg-white/5 text-white/80 hover:border-yellow-400/60 hover:bg-yellow-400/10'
              }`}
              onClick={() => setDuration(dur.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-2">{dur.icon}</div>
              <div className="font-medium text-sm">{dur.label}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Expected Weather */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Cloud className="w-6 h-6" />
          Expected Weather
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weatherOptions.map((option) => (
            <motion.button
              key={option.id}
              className={`p-4 rounded-xl border-2 transition-all relative overflow-hidden ${
                weather === option.id
                  ? 'border-yellow-400 bg-yellow-400/20 text-white'
                  : 'border-white/20 bg-white/5 text-white/80 hover:border-yellow-400/60 hover:bg-yellow-400/10'
              }`}
              onClick={() => setWeather(option.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-10`}
                animate={weather === option.id ? { opacity: [0.1, 0.2, 0.1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative z-10">
                <div className="text-3xl mb-2">{option.icon}</div>
                <div className="font-medium">{option.label}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.button
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-full text-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={!dateType || !location || !timeOfDay || !duration || !weather}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Generate Our Date Plan
            <motion.div
              className="w-4 h-1 bg-white/30 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: dateType && location && timeOfDay && duration && weather ? 16 : 0 }}
            >
              <motion.div
                className="h-full bg-white rounded-full"
                animate={{ x: [-16, 16] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"
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

export default DateCustomization;