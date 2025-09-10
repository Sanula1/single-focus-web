import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

// Business Section Layout with enhanced overlapping
const BusinessSection = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`}>
    <div className="relative h-[500px] w-full">
      {/* Large background image */}
      <div className="absolute top-0 left-4 w-80 h-60 aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 transform hover:scale-105 transition-all duration-500 z-10">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Business mockup"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlapping smaller image - top right */}
      <div className="absolute top-12 right-0 w-40 h-40 aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-green-100 to-blue-100 transform hover:scale-105 transition-all duration-300 z-20">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Team mockup"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Behind image - bottom left */}
      <div className="absolute bottom-8 left-0 w-48 h-36 aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-100 to-pink-100 transform hover:scale-105 transition-all duration-300 z-5">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Handshake mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Small overlapping element - center right */}
      <div className="absolute top-32 right-12 w-28 h-28 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-yellow-100 to-orange-100 transform hover:scale-105 transition-all duration-300 z-15">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Chart mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-1">
        <line x1="20%" y1="50%" x2="70%" y2="30%" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" opacity="0.3">
          <animate attributeName="stroke-dashoffset" values="0;-10" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="60%" y1="70%" x2="85%" y2="45%" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" opacity="0.2">
          <animate attributeName="stroke-dashoffset" values="0;-10" dur="3s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  </div>
);

// Marketing Section Layout with complex overlapping
const MarketingSection = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`}>
    <div className="relative h-[500px] w-full">
      {/* Main large image - slightly off-center */}
      <div className="absolute top-8 left-8 w-72 h-48 aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-100 to-red-100 transform hover:scale-105 transition-all duration-500 z-10">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Marketing mockup"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlapping social element - partially over main image */}
      <div className="absolute top-20 right-4 w-44 h-32 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-cyan-100 transform hover:scale-105 transition-all duration-300 z-20">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Social media mockup"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 rounded p-1">
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </div>
      </div>

      {/* Behind element - bottom right */}
      <div className="absolute bottom-4 right-0 w-56 h-40 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-orange-100 to-yellow-100 transform hover:scale-105 transition-all duration-300 z-5">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Analytics mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Small circular element - floating */}
      <div className="absolute bottom-32 left-4 w-24 h-24 rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-purple-100 to-indigo-100 transform hover:scale-105 transition-all duration-300 z-15">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Profile mockup"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);

// Educators Section Layout with stacked overlapping
const EducatorsSection = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`}>
    <div className="relative h-[500px] w-full">
      {/* School building - back element */}
      <div className="absolute top-4 left-0 w-64 h-44 aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-100 to-teal-100 transform hover:scale-105 transition-all duration-500 z-5">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="School mockup"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Teacher element - overlapping */}
      <div className="absolute top-16 right-8 w-52 h-36 aspect-video rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-indigo-100 transform hover:scale-105 transition-all duration-300 z-20">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Education mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Student element - bottom overlap */}
      <div className="absolute bottom-8 left-16 w-48 h-32 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-yellow-100 to-orange-100 transform hover:scale-105 transition-all duration-300 z-15">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Student mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Book element - floating top right */}
      <div className="absolute top-0 right-0 w-32 h-24 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-red-100 to-pink-100 transform hover:scale-105 transition-all duration-300 z-10">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Book mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Educational badge */}
      <div className="absolute top-20 left-12 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg z-25">
        <span className="text-sm font-medium text-gray-700">🎓 Educational Content</span>
      </div>
    </div>
  </div>
);

// Localization Section Layout with scattered positioning
const LocalizationSection = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`}>
    <div className="relative h-[500px] w-full">
      {/* Main content - center left */}
      <div className="absolute top-12 left-4 w-76 h-48 aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-100 to-blue-100 transform hover:scale-105 transition-all duration-500 z-10">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Localization mockup"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 w-12 h-8 rounded overflow-hidden shadow-md">
          <div className="w-full h-full bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500"></div>
        </div>
      </div>

      {/* Translation element - overlapping right */}
      <div className="absolute top-8 right-0 w-40 h-40 aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-100 to-pink-100 transform hover:scale-105 transition-all duration-300 z-20">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Translation mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Global element - behind bottom */}
      <div className="absolute bottom-4 left-8 w-52 h-36 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-cyan-100 to-blue-100 transform hover:scale-105 transition-all duration-300 z-5">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Global mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Language selector - floating */}
      <div className="absolute bottom-16 right-12 w-28 h-20 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-indigo-100 to-purple-100 transform hover:scale-105 transition-all duration-300 z-15">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Language mockup"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
);

// eCommerce Section Layout with product showcase overlapping
const ECommerceSection = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`}>
    <div className="relative h-[500px] w-full">
      {/* Product 1 - back left */}
      <div className="absolute top-8 left-0 w-44 h-44 aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-100 to-blue-100 transform hover:scale-105 transition-all duration-300 z-5">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Product 1 mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main product showcase - overlapping center */}
      <div className="absolute top-16 left-20 w-72 h-52 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-red-100 transform hover:scale-105 transition-all duration-500 z-15">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="eCommerce mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product 2 - overlapping right */}
      <div className="absolute top-4 right-4 w-36 h-36 aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-pink-100 to-purple-100 transform hover:scale-105 transition-all duration-300 z-20">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Product 2 mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Cart element - bottom right overlap */}
      <div className="absolute bottom-8 right-0 w-48 h-32 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-green-100 to-teal-100 transform hover:scale-105 transition-all duration-300 z-10">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Cart mockup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Small product - floating bottom left */}
      <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-yellow-100 to-orange-100 transform hover:scale-105 transition-all duration-300 z-25">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
          alt="Featured product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Shopping cart overlay */}
      <div className="absolute top-20 right-20 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg z-30">
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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
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
              {title}
            </h2>
            
            <div className="text-lg text-muted-foreground leading-relaxed">
              <p>{description}</p>
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