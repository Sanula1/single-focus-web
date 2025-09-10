import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

const VideoSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-primary-darker relative overflow-hidden">
      {/* Breadcrumb */}
      <div className="absolute top-8 left-8 z-20">
        <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
          <span>Home</span>
          <ArrowRight className="w-4 h-4" />
          <span className="text-primary-foreground">AI Learning Platform</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-primary-foreground">
          <span className="bg-gradient-to-r from-primary-foreground via-accent to-primary-light bg-clip-text text-transparent">
            AI Learning Platform:
          </span>
          <br />
          <span className="text-primary-foreground">
            Learn Faster Than Ever
          </span>
        </h1>

        {/* Video Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="bg-background rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-sm border border-primary-light/20">
            {/* Video Placeholder */}
            <div className="aspect-video bg-muted/50 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-muted/70 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20"></div>
              
              {/* Play Button */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">Watch Our Learning Platform Demo</p>
              </div>

              {/* Video Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-6 h-6 border-2 border-primary rounded-full"></div>
                <div className="absolute top-8 right-8 w-4 h-4 border border-primary rotate-45"></div>
                <div className="absolute bottom-6 left-8 w-5 h-5 border-2 border-primary rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-primary rounded-full"></div>
              </div>
            </div>

            {/* Video Description */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-lg mb-4">
                Discover how our AI-powered learning platform transforms education
              </p>
              <div className="flex justify-center gap-4">
                <Button className="gap-2">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Button>
                <Button variant="outline" className="gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Student Image */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 z-20">
        <div className="relative">
          <img 
            src="/lovable-uploads/9d5bf4bf-067d-4a52-953a-534e8a8bdeaa.png" 
            alt="Graduate Student" 
            className="w-64 h-64 md:w-80 md:h-80 object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-light/30 to-accent/30 rounded-full blur-2xl -z-10"></div>
        </div>
      </div>

      {/* Right Student Image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 z-20">
        <div className="relative">
          <img 
            src="/lovable-uploads/26f78b0d-bd5a-4322-8d6c-dfc56e5a9abd.png" 
            alt="Young Graduate" 
            className="w-48 h-48 md:w-64 md:h-64 object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-l from-primary-light/30 to-accent/30 rounded-full blur-2xl -z-10"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-foreground/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric Decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary-foreground/30 rounded-full animate-spin" 
             style={{ animationDuration: '30s' }}></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-primary-foreground/20 rotate-45 animate-bounce"
             style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 border-2 border-primary-foreground/10 rounded-full animate-ping"
             style={{ animationDuration: '5s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 border border-primary-foreground/15 rotate-12 animate-pulse"></div>
      </div>
    </div>
  );
};

export default VideoSection;