import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface SectionProps {
  title: string;
  description: string;
  isReversed?: boolean;
  delay?: number;
}

const AnimatedSection = ({ title, description, isReversed = false, delay = 0 }: SectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-background flex items-center justify-center px-4 py-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Images Section */}
          <div className={`${isReversed ? 'lg:order-2' : 'lg:order-1'} ${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`} style={{ animationDelay: '200ms' }}>
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Main large image */}
              <div className="col-span-2 relative">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-100 to-blue-100 transform hover:scale-105 transition-all duration-500">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
                    alt="Mockup"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating overlay badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                  <span className="text-sm font-medium text-gray-700">AI Generated</span>
                </div>
              </div>
              
              {/* Small images row */}
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-green-100 to-teal-100 transform hover:scale-105 transition-all duration-300">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
                  alt="Mockup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-pink-100 to-orange-100 transform hover:scale-105 transition-all duration-300 delay-100">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
                  alt="Mockup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-all duration-1000`} style={{ animationDelay: '400ms' }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {title}
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>

            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
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
      delay: 0
    },
    {
      title: "Marketing and social media managers",
      description: "Revolutionize your content strategy with instant video creation. Generate engaging social media content, promotional videos, and marketing campaigns that capture attention. Turn your marketing copy into compelling visual narratives that drive engagement and conversions.",
      isReversed: true,
      delay: 200
    },
    {
      title: "Educators and e-learning creators",
      description: "Bring your lessons to life with dynamic educational videos. Convert lesson plans, course materials, and educational content into engaging visual experiences. Make learning more interactive and accessible for students of all learning styles with AI-generated educational videos.",
      isReversed: false,
      delay: 400
    },
    {
      title: "Localization and translation teams",
      description: "Scale your content globally with multilingual video generation. Transform written content into videos in multiple languages, maintaining consistency across different markets. Perfect for international brands looking to localize their video content efficiently.",
      isReversed: true,
      delay: 600
    },
    {
      title: "eCommerce brands and product sellers",
      description: "Showcase your products with stunning AI-generated videos. Convert product descriptions and specifications into compelling video demonstrations. Increase conversion rates with professional product videos that highlight features and benefits automatically.",
      isReversed: false,
      delay: 800
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
        />
      ))}
    </div>
  );
};

export default TextToVideoSections;