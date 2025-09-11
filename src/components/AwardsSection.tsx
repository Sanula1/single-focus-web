import { Award, Star, Trophy, Medal, Crown } from "lucide-react";

const AwardsSection = () => {
  const awards = [
    {
      platform: "EdTech",
      award: "SHORTLIST",
      year: "2024",
      icon: Trophy,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "Best LMS Platform"
    },
    {
      platform: "TechReview",
      award: "CATEGORY LEADERS",
      year: "2023",
      icon: Crown,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Education Technology"
    },
    {
      platform: "EduAwards",
      award: "LEADER",
      year: "2024",
      icon: Medal,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Innovation Excellence"
    },
    {
      platform: "LearningHub",
      award: "AMONG TOP 100",
      year: "2023",
      icon: Star,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Software Companies"
    },
    {
      platform: "EduTech",
      award: "LEADER",
      year: "2024",
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      description: "Digital Learning"
    }
  ];

  return (
    <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 lg:mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Join Millions of Users to
            <br />
            Save Time and Succeed!
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed">
            Recognized by industry leaders for excellence in educational technology
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {awards.map((award, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-card rounded-xl p-6 md:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[160px] md:min-w-[180px] text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full ${award.bgColor} mb-4`}>
                  <award.icon className={`w-6 h-6 md:w-8 md:h-8 ${award.color}`} />
                </div>
                
                <div className="space-y-2">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs md:text-sm font-bold text-white bg-gradient-to-r from-primary to-primary/80`}>
                    {award.award}
                  </div>
                  
                  <h3 className="font-bold text-sm md:text-base text-foreground">
                    {award.platform}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {award.description}
                  </p>
                  
                  <div className="text-xs text-muted-foreground font-medium">
                    — {award.year} —
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  <div className="w-1 h-1 bg-primary/40 rounded-full"></div>
                  <div className="w-1 h-1 bg-primary/60 rounded-full"></div>
                  <div className="w-1 h-1 bg-primary/40 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <p className="text-sm md:text-base text-muted-foreground">
            Trusted by <span className="font-semibold text-primary">10,000+</span> educational institutions worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;