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
  profile_a: {
    text: string;
    image_data: string | null;
  };
  profile_b: {
    text: string;
    image_data: string | null;
  };
  context: {
    location: string;
    time_of_day: string;
    duration: string;
    date_type: string;
  };
  // Keep legacy fields for UI compatibility
  person1?: {
    description: string;
    instagram: string;
    vibes: string[];
  };
  person2?: {
    description: string;
    instagram: string;
    vibes: string[];
  };
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [profileData, setProfileData] = useState<ProfileData>({
    profile_a: { text: '', image_data: null },
    profile_b: { text: '', image_data: null },
    context: { location: '', time_of_day: '', duration: '', date_type: '' },
    // Legacy fields for UI compatibility
    person1: { description: '', instagram: '', vibes: [] },
    person2: { description: '', instagram: '', vibes: [] }
  });
  const [completeDatePlan, setCompleteDatePlan] = useState<any>(null);
  const [logoClicks, setLogoClicks] = useState(0);
  const [godMode, setGodMode] = useState(false);

  // Demo data from API result
  const demoApiResult = {"request_id":"36e32d0e-a906-4d6f-9aca-2f211918efa8","status":"complete","overall_progress":100,"current_step":6,"steps":{"1":{"name":"Profile Analysis (Both)","status":"complete","duration":17.5,"preview":"Both personalities analyzed (avg confidence: 85%)"},"2":{"name":"Cultural Discovery (Both)","status":"complete","duration":4.8,"preview":"Found 16 total cultural discoveries in amsterdam"},"3":{"name":"Compatibility Calculation","status":"complete","duration":14.2,"preview":"Compatibility: 80% - Theme: Art and Culinary Adventure"},"4":{"name":"Activity Planning","status":"complete","duration":0,"preview":"Activity planning included in compatibility analysis"},"5":{"name":"Venue Discovery","status":"complete","duration":8.0,"preview":"Found 3 perfect venues (success: 50%)"},"6":{"name":"Final Optimization","status":"complete","duration":19.2,"preview":"Complete! 2 activities in amsterdam (6-8)"}},"cultural_previews":["✅ Two personality profiles analyzed (confidence: 85%)","🌍 Discovered 16 cross-domain preferences for both profiles in amsterdam","💝 Real compatibility calculated: 80% match with theme 'Art and Culinary Adventure'","🏢 Selected 3 perfect venues for your date in amsterdam","🎯 Your perfect amsterdam date plan is ready! 2 activities over 6-8"],"eta_seconds":0,"processing_start":"2025-07-26T23:05:28.108761","last_updated":"2025-07-26T23:12:11.960015","elapsed_seconds":403,"final_results_available":true,"final_date_plan_embedded":{"success":true,"message":"Complete 6-step dual profile cultural intelligence pipeline executed successfully","final_date_plan":{"date":{"start_time":"14:00","total_duration":"6-8","actual_hours":4,"end_time":"18:00","theme":"Art and Culinary Adventure","location_city":"amsterdam","activities":[{"sequence":1,"time_slot":"14:00 - 15:30","name":"Visit Rijksmuseum","location_name":"Rijksmuseum, Amsterdam","google_maps_link":"https://maps.google.com/?q=Rijksmuseum,Amsterdam","duration_minutes":90,"activity_type":"cultural","what_to_do":["Explore the masterpieces of Dutch art including Rembrandt's 'Night Watch'.","Engage in discussions about your favorite pieces and what they mean to each of you.","Participate in a guided tour if available, enhancing the experience with expert insights.","Share thoughts on the historical context of the artworks and how they relate to modern society."],"why_recommended":"The Rijksmuseum stimulates intellectual conversation and showcases art that resonates with both of your interests.","conversation_topics":["What is your favorite art style and why?","How do you think art influences culture?","Which artwork here do you feel tells the most compelling story?"],"practical_notes":{"best_time":"Arrive early to avoid crowds, especially on weekends.","cost":"Entry fee is approximately 20 euros per person.","weather_backup":"No weather concerns as the venue is indoors.","what_to_bring":"Comfortable walking shoes and a camera for capturing moments."},"routing_to_next":"After visiting the Rijksmuseum, walk to the nearby cafe in 10 minutes."},{"sequence":2,"time_slot":"15:30 - 18:00","name":"Snack at Café Loetje","location_name":"Café Loetje, Amsterdam","google_maps_link":"https://maps.google.com/?q=Café+Loetje,Amsterdam","duration_minutes":150,"activity_type":"culinary","what_to_do":["Enjoy a selection of Dutch snacks, such as bitterballen or poffertjes.","Discuss your experiences at the museum over a cozy meal.","Try a local beer or Dutch gin to enhance the culinary experience.","Share your favorite food memories and explore each other's tastes."],"why_recommended":"Café Loetje provides a relaxed atmosphere perfect for personal connection and conversation.","conversation_topics":["What is your favorite cuisine and why?","Have you ever tried cooking a dish from a different culture?","What food experience has been the most memorable for you?"],"practical_notes":{"best_time":"Visit during off-peak hours to enjoy a quieter atmosphere.","cost":"Expect to spend around 15-25 euros per person for snacks and drinks.","weather_backup":"Indoor seating available, no weather concerns.","what_to_bring":"An appetite and a desire to explore new flavors."},"routing_to_next":"After your snack, you can easily walk back to the museum area or explore the nearby Vondelpark."}],"logistics":{"total_walking_distance":"Approximately 1.5 km (15 minutes walk total between venues).","transport_needed":"No public transport needed; both venues are within walking distance.","weather_adaptations":"All activities are indoors, so no weather adaptations necessary.","cost_estimate":"Total cost around 55-75 euros for two people.","energy_level":"Moderate; both venues involve walking but are manageable."}},"reasoning":{"compatibility_analysis":{"score":0.8,"score_breakdown":{"shared_values":0.85,"complementary_traits":0.8,"activity_alignment":0.85,"conversation_potential":0.8},"strengths":["Both individuals appreciate art, which fosters engaging discussions.","Shared interest in culinary experiences enhances the date's enjoyment.","The combination of cultural and culinary activities allows for diverse conversation."],"potential_challenges":["Differences in art preferences may arise, but can lead to deeper discussions.","If one person is less comfortable in social settings, pacing may need to be adjusted."]},"cultural_intelligence":{"total_discoveries_analyzed":0,"cross_domain_connections":2,"personality_venue_matches":["Rijksmuseum matches their appreciation for art and history.","Café Loetje creates a relaxed environment for personal connection.","The overall experience allows for a blend of intellectual and personal exploration."],"qloo_influence":"The selection of venues reflects a deep understanding of local culture and culinary preferences."},"success_prediction":{"overall_probability":0.82,"factors":{"venue_quality":0.85,"activity_engagement":0.8,"conversation_flow":0.85,"practical_logistics":0.78},"optimization_notes":["The sequence of art followed by food encourages a natural flow of conversation.","Timing allows for ample exploration without feeling rushed.","Both venues are well-suited to foster connection and shared experiences."]},"frontend_display":{"primary_highlight":"82% success probability - Excellent compatibility","key_selling_points":["0 cultural insights analyzed","Perfect 4-hour activity progression","Authentic Amsterdam experiences beyond tourist spots","Weather-optimized for none season"],"conversation_starters_count":6,"practical_benefits":["All venues within Amsterdam","Indoor backup options available","Cost-effective 4-hour date","Memorable experiences to discuss later"]}},"processing_metadata":{"step_6_completed":true,"step_6_method":"openai_realistic_planning_with_duration","input_activities":2,"input_venues":3,"output_activities":2,"duration_interpretation":{"total_hours":4,"start_time":"14:00","end_time":"18:00","activities_needed":2,"meals_needed":["snack"],"interpretation":"4_hour_afternoon"},"planning_intelligence":"realistic_amsterdam_logistics","attempt_number":1,"pipeline_fully_complete":true,"demo_ready":true,"timestamp":"2025-07-26T23:06:31.936762","input_context":{"location":"amsterdam","time_of_day":"afternoon","season":"none","duration":"6-8","date_type":"first"},"context_preserved":true},"original_context":{"location":"amsterdam","time_of_day":"afternoon","season":"none","duration":"6-8","date_type":"first"}},"pipeline_performance":{"total_time_seconds":63.8,"step_1_time":17.5,"step_2_time":4.8,"step_34_time":14.2,"step_5_time":8.0,"step_6_time":19.2,"steps_completed":6,"pipeline_complete":true},"cultural_intelligence_summary":{"total_discoveries_analyzed":16,"compatibility_score":0.8,"venues_selected":3,"final_activities":2,"location":"amsterdam","dual_profile_mode":true,"demo_ready":true},"redis_backend":true,"timestamp":"2025-07-26T23:06:31.939830"},"results_embedded":true,"embedded_timestamp":"2025-07-26T23:06:31.942305","complete_date_plan":{"success":true,"message":"Complete 6-step dual profile cultural intelligence pipeline executed successfully","final_date_plan":{"date":{"start_time":"14:00","total_duration":"6-8","actual_hours":4,"end_time":"18:00","theme":"Art and Culinary Adventure","location_city":"amsterdam","activities":[{"sequence":1,"time_slot":"14:00 - 15:30","name":"Visit Rijksmuseum","location_name":"Rijksmuseum, Amsterdam","google_maps_link":"https://maps.google.com/?q=Rijksmuseum,Amsterdam","duration_minutes":90,"activity_type":"cultural","what_to_do":["Explore the masterpieces of Dutch art including Rembrandt's 'Night Watch'.","Engage in discussions about your favorite pieces and what they mean to each of you.","Participate in a guided tour if available, enhancing the experience with expert insights.","Share thoughts on the historical context of the artworks and how they relate to modern society."],"why_recommended":"The Rijksmuseum stimulates intellectual conversation and showcases art that resonates with both of your interests.","conversation_topics":["What is your favorite art style and why?","How do you think art influences culture?","Which artwork here do you feel tells the most compelling story?"],"practical_notes":{"best_time":"Arrive early to avoid crowds, especially on weekends.","cost":"Entry fee is approximately 20 euros per person.","weather_backup":"No weather concerns as the venue is indoors.","what_to_bring":"Comfortable walking shoes and a camera for capturing moments."},"routing_to_next":"After visiting the Rijksmuseum, walk to the nearby cafe in 10 minutes."},{"sequence":2,"time_slot":"15:30 - 18:00","name":"Snack at Café Loetje","location_name":"Café Loetje, Amsterdam","google_maps_link":"https://maps.google.com/?q=Café+Loetje,Amsterdam","duration_minutes":150,"activity_type":"culinary","what_to_do":["Enjoy a selection of Dutch snacks, such as bitterballen or poffertjes.","Discuss your experiences at the museum over a cozy meal.","Try a local beer or Dutch gin to enhance the culinary experience.","Share your favorite food memories and explore each other's tastes."],"why_recommended":"Café Loetje provides a relaxed atmosphere perfect for personal connection and conversation.","conversation_topics":["What is your favorite cuisine and why?","Have you ever tried cooking a dish from a different culture?","What food experience has been the most memorable for you?"],"practical_notes":{"best_time":"Visit during off-peak hours to enjoy a quieter atmosphere.","cost":"Expect to spend around 15-25 euros per person for snacks and drinks.","weather_backup":"Indoor seating available, no weather concerns.","what_to_bring":"An appetite and a desire to explore new flavors."},"routing_to_next":"After your snack, you can easily walk back to the museum area or explore the nearby Vondelpark."}],"logistics":{"total_walking_distance":"Approximately 1.5 km (15 minutes walk total between venues).","transport_needed":"No public transport needed; both venues are within walking distance.","weather_adaptations":"All activities are indoors, so no weather adaptations necessary.","cost_estimate":"Total cost around 55-75 euros for two people.","energy_level":"Moderate; both venues involve walking but are manageable."}},"reasoning":{"compatibility_analysis":{"score":0.8,"score_breakdown":{"shared_values":0.85,"complementary_traits":0.8,"activity_alignment":0.85,"conversation_potential":0.8},"strengths":["Both individuals appreciate art, which fosters engaging discussions.","Shared interest in culinary experiences enhances the date's enjoyment.","The combination of cultural and culinary activities allows for diverse conversation."],"potential_challenges":["Differences in art preferences may arise, but can lead to deeper discussions.","If one person is less comfortable in social settings, pacing may need to be adjusted."]},"cultural_intelligence":{"total_discoveries_analyzed":0,"cross_domain_connections":2,"personality_venue_matches":["Rijksmuseum matches their appreciation for art and history.","Café Loetje creates a relaxed environment for personal connection.","The overall experience allows for a blend of intellectual and personal exploration."],"qloo_influence":"The selection of venues reflects a deep understanding of local culture and culinary preferences."},"success_prediction":{"overall_probability":0.82,"factors":{"venue_quality":0.85,"activity_engagement":0.8,"conversation_flow":0.85,"practical_logistics":0.78},"optimization_notes":["The sequence of art followed by food encourages a natural flow of conversation.","Timing allows for ample exploration without feeling rushed.","Both venues are well-suited to foster connection and shared experiences."]},"frontend_display":{"primary_highlight":"82% success probability - Excellent compatibility","key_selling_points":["0 cultural insights analyzed","Perfect 4-hour activity progression","Authentic Amsterdam experiences beyond tourist spots","Weather-optimized for none season"],"conversation_starters_count":6,"practical_benefits":["All venues within Amsterdam","Indoor backup options available","Cost-effective 4-hour date","Memorable experiences to discuss later"]}},"processing_metadata":{"step_6_completed":true,"step_6_method":"openai_realistic_planning_with_duration","input_activities":2,"input_venues":3,"output_activities":2,"duration_interpretation":{"total_hours":4,"start_time":"14:00","end_time":"18:00","activities_needed":2,"meals_needed":["snack"],"interpretation":"4_hour_afternoon"},"planning_intelligence":"realistic_amsterdam_logistics","attempt_number":1,"pipeline_fully_complete":true,"demo_ready":true,"timestamp":"2025-07-26T23:06:31.936762","input_context":{"location":"amsterdam","time_of_day":"afternoon","season":"none","duration":"6-8","date_type":"first"},"context_preserved":true},"original_context":{"location":"amsterdam","time_of_day":"afternoon","season":"none","duration":"6-8","date_type":"first"}},"pipeline_performance":{"total_time_seconds":63.8,"step_1_time":17.5,"step_2_time":4.8,"step_34_time":14.2,"step_5_time":8.0,"step_6_time":19.2,"steps_completed":6,"pipeline_complete":true},"cultural_intelligence_summary":{"total_discoveries_analyzed":16,"compatibility_score":0.8,"venues_selected":3,"final_activities":2,"location":"amsterdam","dual_profile_mode":true,"demo_ready":true},"redis_backend":true,"timestamp":"2025-07-26T23:06:31.939830"},"results_message":"Complete date plan available (embedded results)","results_source":"embedded_in_progress"};

  const demoProfileData = {
    profile_a: {
      text: "28F Amsterdam local, museum hopper by day, karaoke queen by night. Coffee addict who thinks art galleries are the perfect first date spot.",
      image_data: null
    },
    profile_b: {
      text: "30M Amsterdam foodie who knows every hidden restaurant. Adventure seeker who loves weekend bike trips through the canals and trying new cuisines.",
      image_data: null
    },
    context: {
      location: "amsterdam",
      time_of_day: "afternoon",
      duration: "6-8",
      date_type: "first",
      season: "none"
    },
    person1: {
      description: "28F Amsterdam local, museum hopper by day, karaoke queen by night. Coffee addict who thinks art galleries are the perfect first date spot.",
      instagram: "",
      vibes: ["🎨 Artsy", "🎤 Fun-loving", "☕ Caffeine Addict"]
    },
    person2: {
      description: "30M Amsterdam foodie who knows every hidden restaurant. Adventure seeker who loves weekend bike trips through the canals and trying new cuisines.",
      instagram: "",
      vibes: ["🍕 Foodie", "🏔️ Adventurous"]
    }
  };

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

  const goToDemo = () => {
    console.log('Setting demo data:', demoProfileData);
    console.log('Setting demo API result:', demoApiResult);
    setProfileData(demoProfileData);
    setCompleteDatePlan(demoApiResult);
    setCurrentScreen('output');
  };

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const handleProcessingComplete = (datePlan: any) => {
    setCompleteDatePlan(datePlan);
    nextScreen();
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
            <OnboardingScreen key="onboarding" onNext={nextScreen} onDemo={goToDemo} />
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
            <AIProcessing 
              key="processing" 
              profileData={profileData}
              onNext={handleProcessingComplete} 
            />
          )}
          {currentScreen === 'output' && (
            <DatePlanOutput 
              key="output" 
              profileData={profileData}
              completeDatePlan={completeDatePlan}
              onBack={() => setCurrentScreen('onboarding')}
            />
          )}
          {currentScreen === 'how-it-works' && (
            <HowItWorks key="how-it-works" onBack={goToStart} onDemo={goToDemo} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;