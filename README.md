# DateGPT 💘

**Your date, designed for connection.**

AI-powered date planning that analyzes personalities and creates culturally intelligent, personalized date experiences.

🌐 **Live Demo:** [https://dategpt.me](https://dategpt.me)

---

## ✨ What is DateGPT?

DateGPT is an AI-powered dating assistant that transforms simple profile descriptions into thoughtfully curated date plans. Using advanced personality analysis and cultural intelligence, it creates meaningful experiences designed to spark genuine connections.

### 🎯 Key Features

- **🧠 AI Personality Analysis** - Extracts psychology, values, and interests from dating profiles
- **🌍 Cultural Intelligence** - Leverages Qloo's API for cross-domain cultural insights
- **💘 Compatibility Scoring** - Calculates relationship potential and shared values
- **📍 Local Venue Discovery** - Finds real, specific venues that match your personalities
- **⚡ Real-time Processing** - Complete date plans generated in under 90 seconds
- **📱 Mobile-First Design** - Beautiful, responsive interface built with modern web technologies

---

## 🚀 How It Works

DateGPT uses a sophisticated 7-step AI pipeline:

### 1. **Profile Analysis** (OpenAI)
- Extracts Big Five personality traits
- Identifies interests, values, and communication style
- Converts casual bios into structured psychological data

### 2. **Cultural Enhancement** (Qloo API)
- Cross-references interests across music, food, events, books
- Translates preferences into real-world cultural entities
- Discovers high-signal cultural connections

### 3. **Compatibility Engine** (OpenAI)
- Analyzes shared values and complementary differences
- Evaluates personality type compatibility (e.g., INFJ + ENFP)
- Generates thematic compatibility scores

### 4. **Date Generation** (OpenAI)
- Creates culturally intelligent date concepts
- Designs smooth emotional progression (discovery → intimacy)
- Matches activities to social energy and timing preferences

### 5. **Venue Discovery** (Qloo API)
- Locates specific, real venues matching the plan
- Verifies hours, pricing, and location logistics
- Provides backup options and practical details

### 6. **Final Curation** (OpenAI)
- Formats into polished, shareable date plans
- Adds personality-driven commentary and context
- Includes conversation starters and practical tips

### 7. **Frontend Delivery**
- Beautiful, mobile-optimized interface
- Real-time progress tracking
- Shareable results with WhatsApp and image export

---

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - Modern component-based UI
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons
- **Vite** - Fast development and building

### **AI & APIs**
- **OpenAI GPT-4** - Personality analysis and date planning
- **Qloo API** - Cultural intelligence and venue discovery
- **Custom FastAPI Backend** - Processing pipeline orchestration

### **Deployment**
- **Netlify** - Static site hosting and deployment
- **Custom Domain** - Professional branding at dategpt.me

---

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/dategpt.git
cd dategpt

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

---

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── OnboardingScreen.tsx    # Landing page and intro
│   ├── ProfileInput.tsx        # Profile data collection
│   ├── DateCustomization.tsx   # Date preferences setup
│   ├── AIProcessing.tsx        # Real-time processing UI
│   ├── DatePlanOutput.tsx      # Final results display
│   └── HowItWorks.tsx         # Technical explanation
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles and Tailwind imports
└── vite-env.d.ts       # TypeScript environment definitions

public/
├── favicon.svg         # Custom DateGPT favicon
├── favicon.ico         # Fallback favicon
└── index.html          # HTML template

config/
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.ts      # Vite build configuration
├── tsconfig.json       # TypeScript configuration
└── postcss.config.js   # PostCSS configuration
```

---

## 🎨 Design System

### **Color Palette**
- **Primary Gradient:** Red (#DC2626) → Purple (#9333EA) → Green (#059669)
- **Accent Colors:** Pink (#EC4899), Yellow (#EAB308), Blue (#3B82F6)
- **Neutral Tones:** White overlays with opacity variations

### **Typography**
- **Headings:** Bold, large scale for impact
- **Body Text:** Clean, readable with proper contrast
- **Interactive Elements:** Medium weight with hover states

### **Animation Principles**
- **Smooth Transitions:** 0.3s ease-in-out for most interactions
- **Micro-interactions:** Hover states, button presses, loading states
- **Progressive Disclosure:** Staggered animations for content reveal

---

## 🔧 Configuration

### **Environment Variables**
The application connects to external APIs. In production, these are configured automatically:

```bash
# API endpoints (configured in production)
VITE_API_BASE_URL=https://aimor-api-8fd07f4d5603.herokuapp.com
```

### **Build Configuration**
- **Vite** handles bundling and optimization
- **TypeScript** provides type safety
- **Tailwind** purges unused CSS for optimal bundle size

---

## 🚀 Deployment

### **Netlify Deployment**
The application is automatically deployed to Netlify:

1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. **Custom Domain:** dategpt.me
4. **SSL Certificate:** Automatically provisioned

### **Manual Deployment**
```bash
# Build the application
npm run build

# Deploy the dist/ folder to your hosting provider
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### **Code Standards**
- **TypeScript** - All new code should be typed
- **ESLint** - Follow the configured linting rules
- **Component Structure** - Keep components focused and reusable
- **File Organization** - Maintain clean, logical file structure

---

## 📊 Performance

### **Core Web Vitals**
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

### **Bundle Size**
- **Gzipped Bundle:** ~150KB
- **Initial Load:** Optimized with code splitting
- **Image Assets:** Served from external CDNs

---

## 🔒 Privacy & Security

### **Data Handling**
- **No Personal Data Storage** - Profiles processed in real-time only
- **Secure API Communication** - HTTPS encryption for all requests
- **No User Tracking** - Privacy-focused design

### **API Security**
- **Rate Limiting** - Prevents abuse of AI processing
- **Input Validation** - Sanitizes all user inputs
- **Error Handling** - Graceful degradation for API failures

---

## 📈 Roadmap

### **Upcoming Features**
- 🔄 **Profile Photo Upload** - Visual analysis for enhanced personality insights
- 📱 **Instagram Integration** - Deeper cultural analysis from social media
- 🌍 **Multi-language Support** - Global accessibility
- 💾 **Date Plan History** - Save and revisit previous plans
- 🎯 **Advanced Filters** - Budget, accessibility, dietary preferences

### **Technical Improvements**
- ⚡ **Performance Optimization** - Faster loading and processing
- 🧪 **A/B Testing Framework** - Data-driven UX improvements
- 📊 **Analytics Integration** - Usage insights and optimization
- 🔐 **User Accounts** - Personalized experiences and history

---

## 📞 Support

### **Getting Help**
- 🐛 **Bug Reports:** Open an issue on GitHub
- 💡 **Feature Requests:** Submit enhancement proposals
- 📧 **General Questions:** Contact the development team

### **Known Issues**
- Processing may take up to 90 seconds during peak usage
- Some international locations may have limited venue data
- Mobile Safari may require refresh for optimal animation performance

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### **AI Partners**
- **OpenAI** - GPT-4 for personality analysis and date planning
- **Qloo** - Cultural intelligence and venue discovery API

### **Technology Stack**
- **Bolt.new** - AI-powered development platform
- **Netlify** - Hosting and deployment infrastructure
- **React Team** - Framework and ecosystem

### **Design Inspiration**
- Modern dating app UX patterns
- Apple's design philosophy for attention to detail
- Progressive web app best practices

---

<div align="center">

**Made with 💘 by the DateGPT team**

[Live Demo](https://dategpt.me) • [Report Bug](https://github.com/your-username/dategpt/issues) • [Request Feature](https://github.com/your-username/dategpt/issues)

</div>