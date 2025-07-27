import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Heart, 
  Star, 
  Navigation, 
  Coffee, 
  Camera, 
  MessageCircle, 
  Share2,
  Calendar,
  Euro,
  Users,
  Sparkles,
  ExternalLink,
  ChevronRight,
  CheckCircle,
  Download,
  MessageSquare
} from 'lucide-react';

interface DatePlanOutputProps {
  profileData: any;
  completeDatePlan: any;
  onBack: () => void;
}

const DatePlanOutput: React.FC<DatePlanOutputProps> = ({ 
  profileData, 
  completeDatePlan, 
  onBack 
}) => {
  const [activeActivity, setActiveActivity] = useState(0);
  const [showReasons, setShowReasons] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Extract the date plan data
  const datePlan = completeDatePlan?.complete_date_plan?.final_date_plan?.date;
  const reasoning = completeDatePlan?.complete_date_plan?.final_date_plan?.reasoning;
  const activities = datePlan?.activities || [];
  const logistics = datePlan?.logistics;

  if (!datePlan) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h2 className="text-2xl font-bold mb-2">No date plan found</h2>
          <p className="text-white/70">Something went wrong loading your date plan.</p>
        </div>
      </div>
    );
  }

  const compatibilityScore = Math.round((reasoning?.compatibility_analysis?.score || 0.8) * 100);
  const successProbability = Math.round((reasoning?.success_prediction?.overall_probability || 0.82) * 100);

  // Extract budget from logistics.cost_estimate
  const budgetText = logistics?.cost_estimate || 'Cost estimate not available';

  const generateShareText = () => {
    const activitiesText = activities.map((activity: any, index: number) => {
      const whatToDo = activity.what_to_do?.slice(0, 2).map((item: string) => `   • ${item}`).join('\n') || '';
      const conversationTopics = activity.conversation_topics?.slice(0, 2).map((topic: string) => `   - ${topic}`).join('\n') || '';
      
      return `${index + 1}. ${activity.name}
Time: ${activity.time_slot}
Location: ${activity.location_name}
Maps: ${activity.google_maps_link || 'Location details in app'}

What to do:
${whatToDo}

Conversation starters:
${conversationTopics}

Why this works: ${activity.why_recommended}`;
    }).join('\n\n' + '─'.repeat(30) + '\n\n');

    const logisticsText = `
Walking: ${logistics?.total_walking_distance || 'Short distances'}
Transport: ${logistics?.transport_needed || 'Walking only'}
Energy: ${logistics?.energy_level || 'Moderate'}`;

    const compatibilityText = reasoning?.compatibility_analysis?.strengths?.slice(0, 2)
      .map((strength: string) => `- ${strength}`)
      .join('\n') || '';

    return `Our Perfect Date Plan: ${datePlan.theme}

Date: ${datePlan.start_time} - ${datePlan.end_time} (${datePlan.actual_hours} hours in ${datePlan.location_city})
Compatibility: ${compatibilityScore}% | Success Rate: ${successProbability}%
Budget: ${budgetText}

${'═'.repeat(40)}

${activitiesText}

${'═'.repeat(40)}

LOGISTICS:${logisticsText}

WHY THIS WILL WORK:
${compatibilityText}

${'═'.repeat(40)}

Created with DateGPT - Your date, designed for connection`;
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(generateShareText());
    const whatsappUrl = `https://wa.me/?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  const saveAsImage = async () => {
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 900;
      canvas.height = 1600;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#DC2626');
      gradient.addColorStop(0.5, '#9333EA');
      gradient.addColorStop(1, '#059669');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text styles
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';

      // Title
      ctx.font = 'bold 32px Arial';
      ctx.fillText('Your Perfect Date Plan', canvas.width / 2, 60);

      // Theme
      ctx.font = 'bold 24px Arial';
      ctx.fillText(datePlan.theme, canvas.width / 2, 100);

      // Date info
      ctx.font = '18px Arial';
      ctx.fillText(`${datePlan.start_time} - ${datePlan.end_time} • ${datePlan.actual_hours} hours`, canvas.width / 2, 130);
      ctx.fillText(`${datePlan.location_city}`, canvas.width / 2, 155);

      // Stats
      ctx.font = '16px Arial';
      ctx.fillText(`Compatibility: ${compatibilityScore}% | Success Rate: ${successProbability}%`, canvas.width / 2, 190);
      ctx.fillText(budgetText, canvas.width / 2, 215);

      // Activities
      ctx.textAlign = 'left';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('Activities:', 50, 270);

      let yPos = 310;
      activities.forEach((activity: any, index: number) => {
        ctx.font = 'bold 18px Arial';
        ctx.fillText(`${index + 1}. ${activity.name}`, 50, yPos);
        
        ctx.font = '14px Arial';
        ctx.fillStyle = '#E5E7EB';
        ctx.fillText(`⏰ ${activity.time_slot}`, 70, yPos + 25);
        ctx.fillText(`📍 ${activity.location_name}`, 70, yPos + 45);
        
        // Add Google Maps link if available
        if (activity.google_maps_link) {
          ctx.fillText(`🗺️ ${activity.google_maps_link}`, 70, yPos + 65);
        }
        
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        
        // Why recommended
        ctx.fillText('💡 Why this works:', 70, yPos + 90);
        const whyWords = activity.why_recommended.split(' ');
        let line = '';
        let lineY = yPos + 110;
        
        whyWords.forEach((word: string) => {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > 750 && line !== '') {
            ctx.fillText(line, 70, lineY);
            line = word + ' ';
            lineY += 20;
          } else {
            line = testLine;
          }
        });
        ctx.fillText(line, 70, lineY);
        
        // What to do section
        lineY += 30;
        ctx.fillText('✅ What to do:', 70, lineY);
        lineY += 20;
        
        activity.what_to_do?.slice(0, 2).forEach((item: string) => {
          const itemWords = `• ${item}`.split(' ');
          let itemLine = '';
          
          itemWords.forEach((word: string) => {
            const testLine = itemLine + word + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > 750 && itemLine !== '') {
              ctx.fillText(itemLine, 90, lineY);
              itemLine = word + ' ';
              lineY += 18;
            } else {
              itemLine = testLine;
            }
          });
          ctx.fillText(itemLine, 90, lineY);
          lineY += 25;
        });
        
        // Conversation topics
        ctx.fillText('💬 Conversation starters:', 70, lineY);
        lineY += 20;
        
        activity.conversation_topics?.slice(0, 2).forEach((topic: string) => {
          const topicWords = `• ${topic}`.split(' ');
          let topicLine = '';
          
          topicWords.forEach((word: string) => {
            const testLine = topicLine + word + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > 750 && topicLine !== '') {
              ctx.fillText(topicLine, 90, lineY);
              topicLine = word + ' ';
              lineY += 18;
            } else {
              topicLine = testLine;
            }
          });
          ctx.fillText(topicLine, 90, lineY);
          lineY += 25;
        });
        
        yPos = lineY + 40;
        ctx.fillStyle = 'white';
      });

      // Logistics section
      ctx.font = 'bold 18px Arial';
      ctx.fillText('📋 Logistics:', 50, yPos);
      yPos += 30;
      
      ctx.font = '14px Arial';
      ctx.fillStyle = '#E5E7EB';
      ctx.fillText(`🚶‍♀️ Walking: ${logistics?.total_walking_distance || 'Short distances'}`, 70, yPos);
      ctx.fillText(`🚌 Transport: ${logistics?.transport_needed || 'Walking only'}`, 70, yPos + 25);
      ctx.fillText(`⚡ Energy: ${logistics?.energy_level || 'Moderate'}`, 70, yPos + 50);
      
      yPos += 90;
      
      // Why this will work section
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Arial';
      ctx.fillText('💪 Why This Will Work:', 50, yPos);
      yPos += 30;
      
      ctx.font = '12px Arial';
      reasoning?.compatibility_analysis?.strengths?.slice(0, 2).forEach((strength: string) => {
        const strengthWords = `✓ ${strength}`.split(' ');
        let strengthLine = '';
        
        strengthWords.forEach((word: string) => {
          const testLine = strengthLine + word + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > 750 && strengthLine !== '') {
            ctx.fillText(strengthLine, 70, yPos);
            strengthLine = word + ' ';
            yPos += 18;
          } else {
            strengthLine = testLine;
          }
        });
        ctx.fillText(strengthLine, 70, yPos);
        yPos += 25;
      });

      // Footer
      ctx.textAlign = 'center';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#9CA3AF';
      ctx.fillText('Created with DateGPT - Your date, designed for connection', canvas.width / 2, canvas.height - 30);

      // Download the image
      const link = document.createElement('a');
      link.download = `date-plan-${datePlan.theme.toLowerCase().replace(/\s+/g, '-')}-dategpt.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Sorry, there was an error saving the image. Please try again.');
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <Heart className="w-8 h-8 text-pink-400" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Your Perfect Date Plan
          </h1>
          <Heart className="w-8 h-8 text-pink-400" />
        </motion.div>
        
        <motion.div
          className="bg-gradient-to-r from-pink-500/20 to-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-pink-400/30 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">{datePlan.theme}</h2>
          <p className="text-white/80 text-lg">
            {datePlan.start_time} - {datePlan.end_time} • {datePlan.actual_hours} hours in {datePlan.location_city}
          </p>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white/80 font-medium">Compatibility</span>
            </div>
            <div className="text-2xl font-bold text-white">{compatibilityScore}%</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-green-400" />
              <span className="text-white/80 font-medium">Success Rate</span>
            </div>
            <div className="text-2xl font-bold text-white">{successProbability}%</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Euro className="w-5 h-5 text-green-400" />
              <span className="text-white/80 font-medium">Budget</span>
            </div>
            <div className="text-lg font-bold text-white">{budgetText}</div>
          </div>
        </motion.div>
      </div>

      {/* Activities Timeline */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Calendar className="w-6 h-6" />
          Your Date Timeline
        </h3>
        
        <div className="space-y-6">
          {activities.map((activity: any, index: number) => (
            <motion.div
              key={index}
              className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden cursor-pointer transition-all ${
                activeActivity === index ? 'ring-2 ring-pink-400/50' : ''
              }`}
              onClick={() => setActiveActivity(activeActivity === index ? -1 : index)}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{activity.name}</h4>
                      <div className="flex items-center gap-4 text-white/70 text-sm mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {activity.time_slot}
                        </div>
                        {activity.google_maps_link ? (
                          <a
                            href={activity.google_maps_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-white/90 transition-colors cursor-pointer"
                          >
                            <MapPin className="w-4 h-4" />
                            {activity.location_name}
                          </a>
                        ) : (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {activity.location_name}
                          </div>
                        )}
                      </div>
                      <p className="text-white/80">{activity.why_recommended}</p>
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: activeActivity === index ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="w-5 h-5 text-white/60" />
                  </motion.div>
                </div>

                {/* Expanded Details */}
                {activeActivity === index && (
                  <motion.div
                    className="border-t border-white/10 pt-6 mt-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* What to Do */}
                      <div>
                        <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          What to Do
                        </h5>
                        <ul className="space-y-2">
                          {activity.what_to_do?.map((item: string, i: number) => (
                            <li key={i} className="text-white/80 text-sm flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Conversation Topics */}
                      <div>
                        <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-blue-400" />
                          Conversation Starters
                        </h5>
                        <ul className="space-y-2">
                          {activity.conversation_topics?.map((topic: string, i: number) => (
                            <li key={i} className="text-white/80 text-sm flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Practical Info */}
                    <div className="mt-6 bg-white/5 rounded-xl p-4">
                      <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-yellow-400" />
                        Practical Notes
                      </h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">Best Time:</span>
                          <p className="text-white/80">{activity.practical_notes?.best_time}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Cost:</span>
                          <p className="text-white/80">{activity.practical_notes?.cost}</p>
                        </div>
                        <div>
                          <span className="text-white/60">What to Bring:</span>
                          <p className="text-white/80">{activity.practical_notes?.what_to_bring}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Weather Backup:</span>
                          <p className="text-white/80">{activity.practical_notes?.weather_backup}</p>
                        </div>
                      </div>
                    </div>

                    {/* Google Maps Link */}
                    {activity.google_maps_link && (
                      <div className="mt-4">
                       <div className="text-white/60 text-sm mb-2">{activity.location_name}</div>
                        <a
                          href={activity.google_maps_link}
                          target="_blank"
                          rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/80 px-3 py-1.5 rounded-md text-sm transition-colors border border-white/10"
                        >
                         <Navigation className="w-3 h-3" />
                         View on Maps
                         <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Logistics Summary */}
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
          <Users className="w-5 h-5" />
          Logistics Overview
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-white/90 mb-2">Transportation</h4>
            <p className="text-white/70 text-sm">{logistics?.transport_needed}</p>
            <p className="text-white/70 text-sm mt-1">Walking distance: {logistics?.total_walking_distance}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-white/90 mb-2">Energy Level</h4>
            <p className="text-white/70 text-sm">{logistics?.energy_level}</p>
          </div>
        </div>
      </motion.div>

      {/* Why This Works */}
      <motion.div
        className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <button
          onClick={() => setShowReasons(!showReasons)}
          className="w-full text-left"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
            <span className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-green-400" />
              Why This Date Will Be Amazing
            </span>
            <motion.div
              animate={{ rotate: showReasons ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="w-5 h-5 text-white/60" />
            </motion.div>
          </h3>
        </button>
        
        {showReasons && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white/90 mb-2">Compatibility Strengths</h4>
                <ul className="space-y-1">
                  {reasoning?.compatibility_analysis?.strengths?.map((strength: string, i: number) => (
                    <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-white/90 mb-2">Success Factors</h4>
                <ul className="space-y-1">
                  {reasoning?.success_prediction?.optimization_notes?.map((note: string, i: number) => (
                    <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        {/* Share Button */}
        <div className="relative">
          <motion.button
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg relative overflow-hidden group mx-auto block"
            onClick={() => setShowShareOptions(!showShareOptions)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share This Plan
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          {/* Share Options */}
          {showShareOptions && (
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 z-10"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
            >
              <div className="flex flex-col gap-3 min-w-[200px]">
                <motion.button
                  className="flex items-center gap-3 text-white hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                  onClick={shareToWhatsApp}
                  whileHover={{ x: 5 }}
                >
                  <MessageSquare className="w-5 h-5" />
                  Share on WhatsApp
                </motion.button>
                
                <motion.button
                  className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                  onClick={saveAsImage}
                  whileHover={{ x: 5 }}
                >
                  <Download className="w-5 h-5" />
                  Save as Image
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Create Another Date Button */}
        <div className="flex justify-center">
          <motion.button
            className="bg-white/10 backdrop-blur-md text-white font-medium py-3 px-8 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Another Date
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DatePlanOutput;