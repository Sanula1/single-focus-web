import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface TypingTextProps {
  text: string;
  delay?: number;
  isVisible: boolean;
}

const TypingText = ({ text, delay = 0, isVisible }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentIndex, text, isVisible]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setCurrentIndex(0);
        setDisplayedText("");
      }, delay);
    }
  }, [isVisible, delay]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Business Section Layout
const BusinessSection = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`}>
    <div className="relative">
      {/* Main large image */}
      <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 transform hover:scale-105 transition-all duration-500">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Business mockup"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Two smaller images below */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-green-100 to-blue-100 transform hover:scale-105 transition-all duration-300">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
            alt="Team mockup"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-100 to-pink-100 transform hover:scale-105 transition-all duration-300 delay-100">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
            alt="Handshake mockup"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="20%" y1="80%" x2="80%" y2="80%" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" opacity="0.3">
          <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  </div>
);

// Marketing Section Layout
const MarketingSection = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`}>
    <div className="relative">
      {/* Overlapping layout */}
      <div className="relative">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-100 to-red-100 transform hover:scale-105 transition-all duration-500">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
            alt="Marketing mockup"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlapping social media element */}
        <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-cyan-100 transform hover:scale-105 transition-all duration-300 z-10">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
            alt="Social media mockup"
            className="w-full h-full object-cover"
          />
          {/* Facebook-like overlay */}
          <div className="absolute top-2 right-2 bg-blue-600 rounded p-1">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Additional image below */}
      <div className="mt-6 aspect-[3/2] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-orange-100 to-yellow-100 transform hover:scale-105 transition-all duration-300">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Analytics mockup"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);

// Educators Section Layout
const EducatorsSection = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`}>
    <div className="relative">
      {/* School building image */}
      <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-100 to-teal-100 transform hover:scale-105 transition-all duration-500 mb-4">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="School mockup"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Teacher and student image */}
      <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-indigo-100 transform hover:scale-105 transition-all duration-300">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Education mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Educational badge */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
        <span className="text-sm font-medium text-gray-700">🎓 Educational Content</span>
      </div>
    </div>
  </div>
);

// Localization Section Layout
const LocalizationSection = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`}>
    <div className="relative">
      {/* Main content with flag overlay */}
      <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-100 to-blue-100 transform hover:scale-105 transition-all duration-500 relative">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Localization mockup"
          className="w-full h-full object-cover"
        />
        {/* Brazil flag overlay */}
        <div className="absolute top-4 right-4 w-12 h-8 rounded overflow-hidden shadow-md">
          <div className="w-full h-full bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500"></div>
        </div>
      </div>

      {/* Side elements */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-100 to-pink-100 transform hover:scale-105 transition-all duration-300">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
            alt="Translation mockup"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-cyan-100 to-blue-100 transform hover:scale-105 transition-all duration-300 delay-100">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
            alt="Global mockup"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
);

// eCommerce Section Layout
const ECommerceSection = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`}>
    <div className="relative">
      {/* Product showcase layout */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-100 to-blue-100 transform hover:scale-105 transition-all duration-300">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
            alt="Product 1 mockup"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-pink-100 to-purple-100 transform hover:scale-105 transition-all duration-300 delay-100">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
            alt="Product 2 mockup"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main product showcase */}
      <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-red-100 transform hover:scale-105 transition-all duration-500">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="eCommerce mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Shopping cart overlay */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
        <span className="text-sm font-medium text-gray-700">🛒 eCommerce</span>
      </div>
    </div>
  </div>
);

interface SectionProps {
  title: string;
  description: string;
  isReversed?: boolean;
  delay?: number;
  layoutType: 'business' | 'marketing' | 'educators' | 'localization' | 'ecommerce';
}

const AnimatedSection = ({ title, description, isReversed = false, delay = 0, layoutType }: SectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            setTimeout(() => setShowTyping(true), 500);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const renderLayout = () => {
    switch (layoutType) {
      case 'business':
        return <BusinessSection isVisible={isVisible} />;
      case 'marketing':
        return <MarketingSection isVisible={isVisible} />;
      case 'educators':
        return <EducatorsSection isVisible={isVisible} />;
      case 'localization':
        return <LocalizationSection isVisible={isVisible} />;
      case 'ecommerce':
        return <ECommerceSection isVisible={isVisible} />;
      default:
        return <BusinessSection isVisible={isVisible} />;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-background flex items-center justify-center px-4 py-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
          
          {/* Images Section */}
          <div className={`${isReversed ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
            {renderLayout()}
          </div>

          {/* Content Section */}
          <div className={`${isReversed ? 'lg:col-start-1' : 'lg:col-start-2'} space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`} style={{ animationDelay: '600ms' }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {showTyping ? (
                <TypingText text={title} delay={0} isVisible={showTyping} />
              ) : (
                title
              )}
            </h2>
            
            <div className="text-lg text-muted-foreground leading-relaxed">
              {showTyping ? (
                <TypingText text={description} delay={2000} isVisible={showTyping} />
              ) : (
                <p>{description}</p>
              )}
            </div>

            <Button 
              size="lg"
              className={`bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: '1000ms' }}
            >
              Generate video from text
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 ${isReversed ? 'left-10' : 'right-10'} w-32 h-32 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl ${isVisible ? 'animate-pulse' : ''}`}></div>
        <div className={`absolute bottom-1/4 ${isReversed ? 'right-20' : 'left-20'} w-24 h-24 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-2xl ${isVisible ? 'animate-pulse' : ''}`} style={{ animationDelay: '1s' }}></div>
      </div>
    </section>
  );
};

const TextToVideoSections = () => {
  const sections = [
    {
      title: "Businesses and corporate teams",
      description: "Transform your business communications with AI-powered video generation. Create professional presentations, training materials, and corporate announcements effortlessly. Perfect for teams looking to enhance their visual storytelling without complex video editing skills.",
      isReversed: false,
      delay: 0,
      layoutType: 'business' as const
    },
    {
      title: "Marketing and social media managers",
      description: "Revolutionize your content strategy with instant video creation. Generate engaging social media content, promotional videos, and marketing campaigns that capture attention. Turn your marketing copy into compelling visual narratives that drive engagement and conversions.",
      isReversed: true,
      delay: 200,
      layoutType: 'marketing' as const
    },
    {
      title: "Educators and e-learning creators",
      description: "Bring your lessons to life with dynamic educational videos. Convert lesson plans, course materials, and educational content into engaging visual experiences. Make learning more interactive and accessible for students of all learning styles with AI-generated educational videos.",
      isReversed: false,
      delay: 400,
      layoutType: 'educators' as const
    },
    {
      title: "Localization and translation teams",
      description: "Scale your content globally with multilingual video generation. Transform written content into videos in multiple languages, maintaining consistency across different markets. Perfect for international brands looking to localize their video content efficiently.",
      isReversed: true,
      delay: 600,
      layoutType: 'localization' as const
    },
    {
      title: "eCommerce brands and product sellers",
      description: "Showcase your products with stunning AI-generated videos. Convert product descriptions and specifications into compelling video demonstrations. Increase conversion rates with professional product videos that highlight features and benefits automatically.",
      isReversed: false,
      delay: 800,
      layoutType: 'ecommerce' as const
    }
  ];

  return (
    <div className="bg-background">
      {sections.map((section, index) => (
        <AnimatedSection
          key={index}
          title={section.title}
          description={section.description}
          isReversed={section.isReversed}
          delay={section.delay}
          layoutType={section.layoutType}
        />
      ))}
    </div>
  );
};

export default TextToVideoSections;