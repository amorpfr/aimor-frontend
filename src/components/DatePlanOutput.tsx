// This file needs to be examined to find the source of the discrepancy
// The user is seeing "art cafe" content that doesn't match their provided JSON
// which specifies "Rijksmuseum" and "Café Loetje"

// Let me create a basic structure to examine what might be happening
import React from 'react';
import { motion } from 'framer-motion';

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
  // Debug: Let's log what we're actually receiving
  console.log('DatePlanOutput received completeDatePlan:', completeDatePlan);
  console.log('DatePlanOutput received profileData:', profileData);

  // Check if we have the expected data structure
  const datePlan = completeDatePlan?.complete_date_plan?.final_date_plan?.date;
  const activities = datePlan?.activities || [];

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Your Perfect Date Plan
        </h1>
        <p className="text-white/80">
          Theme: {datePlan?.theme || 'Loading...'}
        </p>
      </div>

      {/* Activities */}
      <div className="space-y-6">
        {activities.map((activity: any, index: number) => (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-2">
              {activity.name}
            </h3>
            <p className="text-white/80 mb-2">
              {activity.location_name}
            </p>
            <p className="text-white/60">
              {activity.time_slot}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="mt-8 bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
      >
        Back to Start
      </button>
    </motion.div>
  );
};

export default DatePlanOutput;