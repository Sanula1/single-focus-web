const AwardsSection = () => {
  const awards = [
    {
      platform: "Capterra",
      award: "SHORTLIST",
      year: "2021"
    },
    {
      platform: "GetApp",
      award: "CATEGORY LEADERS", 
      year: "2020"
    },
    {
      platform: "SourceForge",
      award: "LEADER",
      year: "2022"
    },
    {
      platform: "G2",
      award: "AMONG TOP 100",
      year: "2019"
    },
    {
      platform: "Slashdot",
      award: "LEADER",
      year: "2022"
    }
  ];

  return (
    <div className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements matching the reference */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-emerald-400 rounded-lg transform rotate-45 opacity-30"></div>
      <div className="absolute top-20 right-20 w-8 h-8 bg-blue-500 rounded-full opacity-40"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-emerald-400 to-pink-400 rounded-full opacity-25"></div>
      <div className="absolute bottom-10 left-20 w-12 h-6 bg-pink-400 rounded-full opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
            Join Millions of Users to
            <br />
            Save Time and Succeed!
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 max-w-7xl mx-auto">
          {awards.map((award, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              {/* Certificate Badge Image */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/be56f96f-f152-4139-a2d1-ee8183f95216.png" 
                  alt={`${award.platform} ${award.award} ${award.year}`}
                  className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
                
                {/* Overlay Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  {/* Award Type Badge */}
                  <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-1 shadow-lg">
                    {award.award}
                  </div>
                  
                  {/* Platform Name */}
                  <div className="text-yellow-100 font-bold text-sm mb-1 drop-shadow-lg">
                    {award.platform}
                  </div>
                  
                  {/* Year */}
                  <div className="text-yellow-100 text-xs font-medium drop-shadow-lg">
                    — {award.year} —
                  </div>
                </div>

                {/* Decorative dots at bottom */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  <div className="w-1 h-1 bg-blue-800 rounded-full"></div>
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;